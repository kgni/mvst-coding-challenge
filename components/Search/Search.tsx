import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultsUserDropDown from './SearchResultsUserDropDown';
import { UserSearchResult, ToastStatus } from '../../model';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Button from '../UI/Button';

import { Oval } from 'react-loader-spinner';
import Toast from '../UI/Toast';

// async function fetchUsers(url: string) {
// 	try {
// 		const response = await axios.get<UserSearchResult[]>(url);
// 	} catch (err) {
// 		if (err instanceof Error) {
// 			throw new Error('Something went wrong... Try again');
// 		}
// 	}
// }

// type Status = 'pending' | 'success' | 'error'

const Search = () => {
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [users, setUsers] = useState<UserSearchResult[] | null>(null);
	const url = `https://api.github.com/users/${inputValue}`;

	// fetch user
	/* 
	Currently we are just fetching one user, and we are doing it onclick.
	The reason why we are doing it onClick, instead of onChange, is because we are limited to the amount of API calls we can do to the GitHub API.

	For a better UX, we could have made the search onChange, with a debounced function that would ensure that we would only do a query once the user had finished typing (more or less). For now we are just sticking to a button

	*/
	async function fetchUser(fetchURL: string) {
		try {
			setIsLoading(true);
			const res = await axios(fetchURL);
			const { id, name, login, avatar_url, url, html_url, repos_url } =
				res.data;

			const userObj: UserSearchResult[] = [
				{
					id,
					name,
					login,
					avatar_url,
					url,
					html_url,
					repos_url,
				},
			];

			setUsers(userObj);
			setIsLoading(false);
			setIsError(false);
		} catch (err) {
			if (err instanceof Error) {
				setIsLoading(false);
				setUsers(null);
				setIsError(true);
				setErrorMessage('No user found');
			}
		}
	}

	function setErrorFalse(): void {
		setIsError(false);
	}

	// useEffect(() => {
	// 	fetch(baseURL)
	// 		.then((res) => res.json())
	// 		.then((data) =>
	// 			setUsers([
	// 				{
	// 					id: data.id,
	// 					name: data.name,
	// 					login: data.login,
	// 					avatar_url: data.avatar_url,
	// 					url: data.url,
	// 					html_url: data.html_url,
	// 					repos_url: data.repos_url,
	// 				},
	// 			])
	// 		);
	// }, [baseURL]);

	return (
		// error in console, because setInputValue is not an input attribute. How do we keep making SearchBar dynamic, and still pass down the setInputValue function so we can generate state from that?

		<section className="pt-48">
			<div className="max-w-full w-96 mx-auto">
				<SearchBar
					type="input"
					id="search"
					placeholder="Enter GitHub username.."
					value={inputValue}
					setInputValue={setInputValue}
					className="p-2 bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text focus:outline-none outline-none focus:border-btnText  text-btnText  duration-75"
				/>
				{/* AnimatePresence is used for exit animations (on unmount of the SearchResultsUserDropDown component) */}
				<AnimatePresence>
					{/* {inputValue && <SearchResultsUserDropDown users={users} />} */}
					{isError && (
						<Toast
							status="error"
							closeFunction={setErrorFalse}
							errorMessage={errorMessage}
							className="text-white"
						></Toast>
					)}
					{users && <SearchResultsUserDropDown users={users} />}
				</AnimatePresence>
				{/* TODO - Move this inside Searchbar inside the form (give better name to SearchBar) */}
				<Button isLoading={isLoading} url={url} fetchUser={fetchUser}>
					Find User
				</Button>
			</div>
		</section>
	);
};

export default Search;
