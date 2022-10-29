import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResultsUserDropDown from './SearchResultsUserDropDown';
import { UserSearchResult } from '../../model';
import { useQuery } from '@tanstack/react-query';
const Search = () => {
	const [inputValue, setInputValue] = useState('');

	const [users, setUsers] = useState<UserSearchResult[] | null>(null);

	const { data } = useQuery(['test'], () => Promise.resolve('hello'));

	console.log(data);

	return (
		// error in console, because setInputValue is not an input attribute. How do we keep making SearchBar dynamic, and still pass down the setInputValue function so we can generate state from that?
		<section className="pt-48">
			<div className="max-w-full w-96 mx-auto">
				<SearchBar
					type="input"
					id="search"
					placeholder="Find a GitHub user..."
					value={inputValue}
					setInputValue={setInputValue}
					className="p-2 bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text focus:outline-none outline-none focus:border-btnText  text-btnText  duration-75"
				/>
				{inputValue && <SearchResultsUserDropDown users={users} />}
			</div>
		</section>
	);
};

export default Search;
