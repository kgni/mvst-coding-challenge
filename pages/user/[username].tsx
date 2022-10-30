import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Repo, User } from '../../model';
import axios from 'axios';

import UserAside from '../../components/User/UserAside';
import SearchBar from '../../components/Search/SearchBar';
import ReposList from '../../components/Repos/ReposList';

/* gitHub language colors. each programming langauge on github has assigned a color. This is basically just a JSON file with all those colors
	that we can then use to dynamically render the correct color based on the language used in a repo.
*/
import gitHubColors from '../../data/gitHubColors.json' assert { type: 'JSON' };

interface Props {
	user: User;
}

// TODO - create main side

// TODO - create pagination

// TODO - how are we gonna search by keyword? (we can only fetch 100 pages at max, so we need to be able to query the API, and not only the repos that you fetched initally.)
const UserPage: React.FC<Props> = ({ user }) => {
	const [searchTerm, setSearchTerm] = useState('');
	console.log(user.repos);
	return (
		<section className="min-h-screen bg-primary">
			<div className="w-full max-w-5xl py-16 px-8  mx-auto text-text flex gap-16">
				<UserAside user={user} />

				<main className="w-2/3">
					{/* TODO - create tabs */}

					<section className="flex border-b-[1px] border-btnBorder pb-2">
						<SearchBar
							className="px-2 py-1 grow bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text focus:outline-none outline-none focus:border-btnText  text-btnText  duration-75"
							type="input"
							value={searchTerm}
							onChange={setSearchTerm}
							placeholder="Find a repository..."
						/>
					</section>
					<section>
						<ReposList repos={user.repos} />
					</section>
					{/* create searchbar with sorting functionality */}
					{/* create list of repos - fill star when clicking*/}
				</main>
			</div>
		</section>
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
			// repos,
		},
	};
};
