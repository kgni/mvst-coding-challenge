import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Components
import SearchBar from './SearchBar';
import SearchResultsUserDropDown from './SearchResultsUserDropDown';
import Button from '../UI/Button';
import Toast from '../UI/Toast';

// Models
import { UserSearchResult } from '../../model';

// TODO - ADD GITHUB AUTH FOR MORE API CALLS AN HOUR
// Is this just a token in the request header?

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>('');
	const [users, setUsers] = useState<UserSearchResult[]>([]);
	const url = `https://api.github.com/users/${searchTerm}`;

	// fetch user
	/* 
	Currently we are just fetching one user, and we are doing it onclick.
	The reason why we are doing it onClick, instead of onChange, is because we are limited to the amount of API calls we can do to the GitHub API.
	https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting

	For a better UX, we could have made the search onChange, with a debounced function that would ensure that we would only do a query once the user had finished typing (more or less). For now we are just sticking to a button

	*/

	async function fetchUser(fetchURL: string): Promise<void> {
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
			setErrorMessage(null);
		} catch (err) {
			// check what statuscode we are getting and decide errormessage depending on that
			setIsLoading(false);
			setUsers([]);
			setErrorMessage('No user found');
			console.log(err);
		}
	}

	function setErrorFalse(): void {
		setErrorMessage(null);
	}

	return (
		// error in console, because setSearchTerm is not an input attribute. How do we keep making SearchBar dynamic, and still pass down the setSearchTerm function so we can generate state from that?

		<section className="pt-48">
			<div className="max-w-full w-96 mx-auto">
				<SearchBar
					type="input"
					id="search"
					placeholder="Enter GitHub username.."
					value={searchTerm}
					onChange={setSearchTerm}
					className="p-2 bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text focus:outline-none outline-none focus:border-btnText  text-btnText  duration-75"
				/>
				{/* AnimatePresence is used for exit animations (on unmount of the SearchResultsUserDropDown component) */}
				<AnimatePresence>
					{/* {searchTerm && <SearchResultsUserDropDown users={users} />} */}
					{errorMessage && (
						<Toast
							status="error"
							onClose={setErrorFalse}
							errorMessage={errorMessage}
							className="text-white"
						/>
					)}
					{users && <SearchResultsUserDropDown users={users} />}
				</AnimatePresence>
				{/* TODO - Move this inside Searchbar inside the form (give better name to SearchBar) */}
				<Button isLoading={isLoading} onClick={() => fetchUser(url)}>
					Find User
				</Button>
			</div>
		</section>
	);
};

export default Search;
