import React from 'react';
import Router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { User, Repo } from '../../model';
import axios from 'axios';
import { FiUsers } from 'react-icons/fi';
const UserPage = ({ user }: { user: User }) => {
	return (
		<section className="min-h-screen bg-primary">
			<div className="w-full max-w-5xl py-16 px-8  mx-auto text-text flex gap-4">
				<aside className="w-1/3">
					<img
						className="w-72 rounded-full mb-8"
						src={user.avatar_url}
						alt=""
					/>
					<div className="mb-4">
						<h3 className="text-btnText text-2xl">{user.name}</h3>
						<p>{user.login}</p>
					</div>
					<p className="text-btnText">{user.bio}</p>
					<button className="bg-btnPrimary w-full rounded-md border-[1px] border-btnBorder text-sm py-1 text-btnText my-4 hover:bg-btnHover hover:border-btnBorderHover duration-75 font-light tracking-wide">
						Edit profile
					</button>
					<div className="flex items-center gap-1 text-sm mb-10">
						<div className=" flex items-center">
							<FiUsers className="mr-2" />
							<span className="text-btnText">{user.followers}&nbsp;</span>{' '}
							followers
						</div>
						<span>&middot;</span>
						<div className=" flex ">
							<span className="text-btnText">{user.following}&nbsp;</span>{' '}
							following
						</div>
					</div>
					<div className="text-btnText font-light tracking-wide text-sm">
						<div>{user.location}</div>
						<div>{user.blog}</div>
						<div>
							<a
								target="_blank"
								rel="noreferrer"
								href={`https://twitter.com/${user.twitter_username}`}
								className="hover:text-title"
							>
								@{user.twitter_username}
							</a>
						</div>
					</div>
				</aside>
				<main className="w-2/3"></main>
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
