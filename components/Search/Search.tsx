import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultsUserDropDown from './SearchResultsUserDropDown';
import { UserSearchResult } from '../../model';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Button from '../UI/Button';

// fethc user function

// async function fetchUsers(url: string) {
// 	try {
// 		const response = await axios.get<UserSearchResult[]>(url);
// 	} catch (err) {
// 		if (err instanceof Error) {
// 			throw new Error('Something went wrong... Try again');
// 		}
// 	}
// }

const Search = () => {
	const [inputValue, setInputValue] = useState('');
	const [users, setUsers] = useState<UserSearchResult[] | null>(null);
	const baseURL = `https://api.github.com/users/${inputValue}`;
	console.log(baseURL);

	// grab all users

	useEffect(() => {
		fetch(baseURL)
			.then((res) => res.json())
			.then((data) =>
				setUsers([
					{
						id: data.id,
						name: data.name,
						login: data.login,
						avatar_url: data.avatar_url,
						url: data.url,
						html_url: data.html_url,
						repos_url: data.repos_url,
					},
				])
			);
	}, [baseURL]);

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
					{inputValue && <SearchResultsUserDropDown users={users} />}
				</AnimatePresence>
				<Button>Find User</Button>
			</div>
		</section>
	);
};

export default Search;
