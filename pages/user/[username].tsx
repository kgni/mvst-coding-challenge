import React from 'react';
import { GetServerSideProps } from 'next';
import { User } from '../../model';
import axios from 'axios';

import UserAside from '../../components/User/UserAside';

// TODO - create main side

// TODO - create pagination

// TODO - how are we gonna search by keyword? (we can only fetch 100 pages at max, so we need to be able to query the API, and not only the repos that you fetched initally.)
const UserPage = ({ user }: { user: User }) => {
	return (
		<section className="min-h-screen bg-primary">
			<div className="w-full max-w-5xl py-16 px-8  mx-auto text-text flex gap-4">
				<UserAside user={user} />

				<main className="w-2/3">
					{/* TODO - create tabs */}
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
	// fetch user repo

	// const { data } = await axios.get(
	// 	`https://jsonplaceholder.typicode.com/todos/1`
	// );

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

	// extract all repoData

	// TODO - sanitize repos, current how to do this, so they look like the interface?
	// const repos: Repo[] = reposData.map((repo: Repo) => {
	// 	return { id, name, html_url, description };
	// });

	// console.log(repos);

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
		repos: reposData,
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
