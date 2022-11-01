import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Models
import { UserSearchResult } from '../../model';
import Footer from '../Footer';

// Components
import SearchBar from './SearchBar';
import SearchResultsUsersDropDown from './SearchResultsUsersDropDown';
import Button from '../UI/Buttons/Button';
import Toast from '../UI/Toast';
import Image from 'next/image';

const Search: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>('');
	const [users, setUsers] = useState<UserSearchResult[]>([]);

	// url for fetching
	const url = `https://api.github.com/search/users?q=${searchTerm}`;

	// fetch users
	/* 
	Currently we are just fetching users onclick.
	The reason why we are doing it onClick, instead of onChange, is because we are limited to the amount of API calls we can do to the GitHub API.
	https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting

	For a better UX, we could have made the search onChange, with a debounced function that would ensure that we would only do a query once the user had finished typing (more or less). For now we are just sticking to a button.
	*/

	async function fetchUsers(fetchURL: string): Promise<void> {
		try {
			setIsLoading(true);
			// fetch users
			const { items: users } = await (await fetch(fetchURL)).json();
			setUsers(users);
			setIsLoading(false);

			// if we get data back set errormessage to null, else set it to 'No user found'
			users.length ? setErrorMessage(null) : setErrorMessage('No user found');
		} catch (err) {
			setIsLoading(false);
			// set users to empty array so prior search results are removed
			setUsers([]);
			setErrorMessage('No user found');
		}
	}

	// used to close error message
	function setErrorFalse(): void {
		setErrorMessage(null);
	}

	// fetch user on submit
	function onSubmitSearchUser(event: React.SyntheticEvent) {
		event.preventDefault();
		fetchUsers(url);
	}

	return (
		<section className="pt-20 searchPage ">
			<div className="max-w-full w-96 mx-auto">
				<div className="flex justify-center mb-20">
					<Image
						src="/logo/mvst_github_logo.svg"
						alt="logo"
						width={80}
						height={80}
					/>
				</div>
				<form onSubmit={onSubmitSearchUser}>
					<SearchBar
						type="input"
						id="search"
						placeholder="Enter GitHub username.."
						value={searchTerm}
						onChange={setSearchTerm}
						className="p-2 bg-primary border-[1px] border-btnBorder placeholder:font-thin w-full rounded-md  placeholder:text-text focus:outline-none outline-none focus:border-btnBorderHover  text-btnText  duration-75"
					/>
					{/* AnimatePresence is used for exit animations (on unmount of the SearchResultsUserDropDown component) */}
					<AnimatePresence>
						{errorMessage && (
							<Toast
								status="error"
								onClose={setErrorFalse}
								errorMessage={errorMessage}
								className="text-white mt-2"
							/>
						)}
						{users && <SearchResultsUsersDropDown users={users} />}
					</AnimatePresence>
					<Button isLoading={isLoading} className="w-full mt-2 select-none">
						Find User
					</Button>
				</form>
			</div>
			<Footer />
		</section>
	);
};

export default Search;
