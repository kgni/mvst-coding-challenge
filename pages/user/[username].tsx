import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Repo, User } from '../../model';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Head from 'next/head';

import { BiBookBookmark } from 'react-icons/bi';

import UserAside from '../../components/User/UserAside';
import SearchBar from '../../components/Search/SearchBar';
import ReposList from '../../components/Repos/ReposList';

/* gitHub language colors. each programming langauge on github has assigned a color. This is basically just a JSON file with all those colors
	that we can then use to dynamically render the correct color based on the language used in a repo.
*/
import gitHubColors from '../../data/gitHubColors.json' assert { type: 'JSON' };
import NextPrev from '../../components/UI/Pagination/NextPrev';
import Button from '../../components/UI/Button';
import Link from 'next/link';
import { AiOutlineRollback } from 'react-icons/ai';

interface Props {
	user: User;
}

// TODO - CREATE BACK BUTTON TO GO BACK TO SEARCH

// TODO - how are we gonna search by keyword? (we can only fetch 100 pages at max, so we need to be able to query the API, and not only the repos that you fetched initally.)
const UserPage: React.FC<Props> = ({ user }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
	const [repos, setRepos] = useState<Repo[]>(user.repos);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	// not exactly sure how to import this JSON file, but this works for now.
	// We are going to use this object, to match the language we got back from each repo.
	// This color will be set in a variable, and used in each Repo list item.
	const gitHubColorsObject = JSON.parse(JSON.stringify(gitHubColors));

	console.log(page);

	// getting repos length, this will be used to determine if we can continue to go to a new page.
	const reposLength = repos.length;

	async function fetchRepos(page?: number) {
		try {
			setIsLoading(true);
			const { data: reposData } = await axios.get(
				`https://api.github.com/users/${user.login}/repos?&page=${page}`
			);

			console.log(
				`https://api.github.com/users/${user.login}/repos?&page=${page}`
			);

			// Sanitizing our repos data, to only contain what we need - not sure if this is the best way to do it.. We are still fetching all data from each repo anyways.
			const repos: Repo[] = reposData.map((repo: Repo) => {
				// standard langauge color (if no langaugecolor was found)
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
					languageColor,
				};
			});

			console.log(repos);
			setRepos(repos);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		fetchRepos(page);
	}, [page]);

	function onClickPreviousPage() {
		// scroll to top when clicking on next/prev buttons
		window.scrollTo({ top: 0, left: 0 });
		setPage((prev) => prev - 1);
	}
	function onClickNextPage() {
		// scroll to top when clicking on next/prev buttons
		window.scrollTo({ top: 0, left: 0 });
		setPage((prev) => prev + 1);
	}

	return (
		<>
			<Head>
				<title>
					{user.login} {user.name && `(${user.name})`}
				</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<section className="bg-primary">
				<div className="h-screen w-full max-w-5xl flex gap-16 py-16 px-8 md:py-8  mx-auto text-text overflow-hidden md:flex-col md:gap-0 md:min-h-screen md:h-full">
					<UserAside user={user} />

					{/* using flex and flex-col to make container take up the remaining height */}
					<main className="w-2/3 flex flex-col md:w-full">
						{/* TODO - create tabs */}
						<div className="flex mb-4 items-start justify-between sm:items-center">
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
							<form className="flex items-center gap-2 mb-4 ">
								<SearchBar
									className="px-2 py-1 grow bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text focus:outline-none outline-none focus:border-btnText  text-btnText  duration-75"
									type="input"
									value={searchTerm}
									onChange={setSearchTerm}
									placeholder="Find a repository..."
								/>
								{/* TODO - fix this so button and search bar are same height */}
								<Button className="px-4 py-[4px]">Search</Button>
							</form>
							{/* divider */}
							<div className="w-full bg-btnBorder pr-2 h-[1px] mb-1"></div>
						</section>
						{/* overflow to make repolist section scrollable, instead of the entire screen being scrollable */}
						<section className="overflow-auto mb-8">
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
							{repos && !isLoading && <ReposList repos={repos} />}
						</section>
						{reposLength > 0 && !isLoading && (
							<NextPrev
								page={page}
								items={reposLength}
								onClickPreviousPage={onClickPreviousPage}
								onClickNextPage={onClickNextPage}
							/>
						)}

						{reposLength === 0 && (
							<p>{user.login} has no public repositories...</p>
						)}
						{/* create searchbar with sorting functionality */}
						{/* create list of repos - fill star when clicking*/}
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

	// getting username from url query. This will be used for fetching
	const { username } = context.query;

	// TODO - can we do anything else than fetching twice here? (Doesn't seem like it from the API)
	// fetch user
	const { data: userData } = await axios.get(
		`https://api.github.com/users/${username}`
	);

	//fetching repos: by default it is fetching 30
	// https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
	const { data: reposData } = await axios.get(
		`https://api.github.com/users/${username}/repos`
	);

	// extract all userData
	const {
		id,
		name,
		login,
		bio,
		avatar_url,
		url,
		html_url,
		repos_url,
		followers,
		following,
		company,
		blog,
		location,
		email,
		twitter_username,
		public_repos,
	} = userData;

	// Sanitizing our repos data, to only contain what we need - not sure if this is the best way to do it.. We are still fetching all data from each repo anyways.
	const repos: Repo[] = reposData.map((repo: Repo) => {
		// standard langauge color (if no langaugecolor was found)
		let languageColor = '#8B949E';

		// if there is a langauge, we set the language color to the HEX value specified for that language in the JSON file.
		if (repo.language) {
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
			languageColor,
		};
	});
	// TODO - sanitize repos, current how to do this, so they look like the interface?

	const user: User = {
		id,
		name,
		login,
		bio,
		avatar_url,
		url,
		html_url,
		repos_url,
		followers,
		following,
		company,
		blog,
		location,
		email,
		twitter_username,
		public_repos,
		repos,
	};

	// With notFound: true, the page will return a 404 even if there was a successfully generated page before.
	if (!userData) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			user,
		},
	};
};
