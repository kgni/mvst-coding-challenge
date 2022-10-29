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
		<section className="pt-48">
			<SearchBar
				type="input"
				id="search"
				placeholder="Find a GitHub user..."
				inputValue={inputValue}
				setInputValue={setInputValue}
				className="p-2 bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text focus:outline-none outline-none focus:border-btnText  text-btnText  duration-75"
			/>
			{inputValue && <SearchResultsUserDropDown users={users} />}
		</section>
	);
};

export default Search;
