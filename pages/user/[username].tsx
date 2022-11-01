import React, { useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

// models
import { Repo, User } from '../../model';

// helpers
import { scrollToWindow } from '../../helpers/scrollTo';
import applyRepoFilters from '../../helpers/applyRepoFilters';

// components
import NextPrev from '../../components/UI/Pagination/NextPrev';
import { Oval } from 'react-loader-spinner';
import { BiBookBookmark } from 'react-icons/bi';
import UserAside from '../../components/User/UserAside';
import SearchBar from '../../components/Search/SearchBar';
import ReposList from '../../components/Repos/ReposList';
import FilterButton from '../../components/UI/Buttons/FilterButton';

/* gitHub language colors. each programming langauge on github has assigned a color. This is basically just a JSON file with all those colors
	that we can then use to dynamically render the correct color based on the language used in a repo.
*/
import gitHubColors from '../../data/gitHubColors.json' assert { type: 'JSON' };

interface Props {
	user: User;
}

const UserPage: React.FC<Props> = ({ user }) => {
	const [page, setPage] = useState(1);
	const [repos, setRepos] = useState<Repo[]>(user.repos);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// sorting/searching criteria states:
	const [searchTerm, setSearchTerm] = useState('');
	const [type, setType] = useState<'Public' | 'Forks'>('Public');
	const [sort, setSort] = useState<'Last updated' | 'Name'>('Last updated');

	// getting repos length, this will be used to determine if we can continue to go to a new page.
	const reposLength = repos.length;
	// calculate the total amount of pages (30 items per page)
	const itemsLimit = 30;
	const totalPages = Math.ceil(reposLength / itemsLimit);

	// applying filters / sorts for repos.
	const filteredRepos = applyRepoFilters(repos, searchTerm, type, sort);

	// targeting repoListContainer so we can scroll to the top when clicking next, and previous buttons
	const repoListContainer = useRef<HTMLInputElement>(null);

	function onClickPreviousPage() {
		// scroll to top when clicking on next/prev buttons
		scrollToWindow(0, 0);
		repoListContainer.current?.scrollTo(0, 0);
		setPage((prev) => prev - 1);
	}
	function onClickNextPage() {
		// scroll to top when clicking on next/prev buttons
		scrollToWindow(0, 0);
		repoListContainer.current?.scrollTo(0, 0);
		setPage((prev) => prev + 1);
	}

	return (
		<>
			<Head>
				<title>{user.login}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<section className="bg-primary">
				<div className="h-screen w-full max-w-5xl flex gap-16 py-16 px-8 md:py-8  mx-auto text-text overflow-hidden md:flex-col md:gap-0 md:min-h-screen md:h-full">
					<UserAside user={user} />

					{/* using flex and flex-col to make container take up the remaining height */}
					<main className="w-2/3 flex flex-col md:w-full">
						<div className="flex mb-4 items-center justify-between">
							<div className="flex items-center border-b-accent border-b-[1px] pb-2 gap-2">
								<BiBookBookmark />
								<p className="text-btnText">Repositories</p>
								<span className="text-btnText bg-btnPrimary inline-block p-1 px-2 rounded-full text-xs">
									{user.public_repos}
								</span>
							</div>
							<Link className="text-sm text-title hover:underline" href={'/'}>
								Back to search
							</Link>
						</div>
						<section className="pb-2">
							<form
								onSubmit={(e) => e.preventDefault()}
								className="flex gap-2 mb-4 "
							>
								<SearchBar
									className="px-2 py-1 grow bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text placeholder:sm:text-sm focus:outline-none outline-none focus:border-btnBorderHover  text-btnText  duration-75"
									type="input"
									value={searchTerm}
									setPage={setPage}
									onChange={setSearchTerm}
									placeholder="Find repositories..."
								/>
								<FilterButton
									title="Type"
									subtitle="Select type"
									selected={type}
									options={['Public', 'Forks']}
									filterFunc={setType}
								/>
								<FilterButton
									title="Sort"
									subtitle="Select order"
									selected={sort}
									options={['Last updated', 'Name']}
									filterFunc={setSort}
								/>
							</form>
							{/* divider */}
							<div className="w-full bg-btnBorder pr-2 h-[1px] mb-1"></div>
						</section>
						{/* overflow to make repolist section scrollable, instead of the entire screen being scrollable */}
						<section ref={repoListContainer} className="overflow-auto">
							{isLoading && (
								<div className="flex justify-center mt-6">
									<Oval
										width={30}
										height={30}
										color="white"
										secondaryColor="whte"
										strokeWidth={2}
									/>
								</div>
							)}
							{repos && !isLoading && (
								<ReposList
									repos={filteredRepos}
									page={page}
									itemsLimit={itemsLimit}
								/>
							)}
						</section>
						{filteredRepos.length > 0 &&
							!isLoading &&
							user.public_repos > itemsLimit && (
								<NextPrev
									page={page}
									totalPages={totalPages}
									itemsLength={filteredRepos.length}
									onClickPreviousPage={onClickPreviousPage}
									onClickNextPage={onClickNextPage}
								/>
							)}

						{filteredRepos.length === 0 && <p>No repositories found...</p>}
					</main>
				</div>
			</section>
		</>
	);
};

export default UserPage;

export const getServerSideProps: GetServerSideProps<{
	user: User;
}> = async (context) => {
	// not exactly sure how to import this JSON file, but this works for now.
	// We are going to use this object, to match the language we got back from each repo.
	// This color will be set in a variable, and used in each Repo list item.
	const gitHubColorsObject = JSON.parse(JSON.stringify(gitHubColors));

	// getting username from query. This will be used for fetching the correct user data.
	const { username } = context.query;

	// fetch user
	const userData = await (
		await fetch(`https://api.github.com/users/${username}`, {
			headers: {
				Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
			},
		})
	).json();

	// initial page number for querying repos
	let page = 1;

	// amount of repos per page when querying (30 is default)
	const itemsLimit = 100;

	// array for keeping track of all fetched repos.
	const reposFetched: Repo[] = [];

	// while loop that will keep fetching from the API (one page at a time), until we are either getting 0 repos back or the amount of repos we get back is less than the itemsLimit.
	while (true) {
		try {
			const reposData = await (
				await fetch(
					`https://api.github.com/users/${username}/repos?page=${page}&per_page=${itemsLimit}`,
					{
						headers: {
							Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
						},
					}
				)
			).json();

			console.log(reposData);

			// push the fetched repos into our reposFetched array
			reposFetched.push(...reposData);

			// if we get an empty array back, or the length of the array is less than the itemsLimit (meaning that this was the last page of items), then we break out of the loop
			if (reposData.length === 0 || reposData.length < itemsLimit) {
				break;
			}

			// increment page for next fetch
			page++;
		} catch (e) {
			// console.log(e);
			// if an error ocurred return a 404 page
			return {
				notFound: true,
			};
		}
	}

	console.log('length', reposFetched.length);

	// Sanitizing our repos data, to only contain what we need - not sure if this is the best way to do it.. We are still fetching all data from each repo anyways, we are just not working with huge objects on the frontend.
	const repos: Repo[] = reposFetched.map((repo: Repo) => {
		// standard langauge color (if no langaugeColor was found in the github colors JSON)
		let languageColor = '#8B949E';

		// if there is a langauge, and there is a color for that languge from the JSON file we set the language color to the HEX value specified for that language in the JSON file.
		if (repo.language && gitHubColorsObject[repo.language]?.color) {
			languageColor = gitHubColorsObject[repo.language].color;
		}

		return {
			id: repo.id,
			name: repo.name,
			html_url: repo.html_url,
			description: repo.description,
			updated_at: repo.updated_at,
			language: repo.language,
			forks_count: repo.forks_count,
			visibility: repo.visibility,
			fork: repo.fork,
			forks_url: repo.forks_url,
			languageColor,
		};
	});

	// extract all relevant userData
	// const {
	// 	id,
	// 	name,
	// 	login,
	// 	bio,
	// 	avatar_url,
	// 	url,
	// 	html_url,
	// 	repos_url,
	// 	followers,
	// 	following,
	// 	company,
	// 	blog,
	// 	location,
	// 	email,
	// 	twitter_username,
	// 	public_repos,
	// } = userData;

	// 1 single user object, containing all the sanizited repos as well.
	const user: User = {
		id: userData.id,
		name: userData.name,
		login: userData.login,
		bio: userData.bio,
		avatar_url: userData.avatar_url,
		url: userData.url,
		html_url: userData.html_url,
		repos_url: userData.repos_url,
		followers: userData.followers,
		following: userData.following,
		company: userData.company,
		blog: userData.blog,
		location: userData.location,
		email: userData.email,
		twitter_username: userData.twitter_username,
		public_repos: userData.public_repos,
		repos,
	};

	// With notFound: true, the page will return a 404 even if there was a successfully generated page before.

	return {
		props: {
			user,
		},
	};
};
