import React from 'react';
import { UserSearchResult } from '../../model';
const SearchResultsUserDropDown = ({
	users,
}: {
	users: UserSearchResult[] | null;
}) => {
	return (
		<ul>
			{users?.map((user) => (
				<li className="flex" key={user.id}>
					<img src={user.avatar_url} alt="avatar" />
					<div>
						<h3>{user.name}</h3>
						<p>{user.login}</p>
					</div>
				</li>
			))}
		</ul>
	);
};

export default SearchResultsUserDropDown;
