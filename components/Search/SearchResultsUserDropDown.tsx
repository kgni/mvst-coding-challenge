import Image from 'next/image';
import React from 'react';
import { UserSearchResult } from '../../model';
const SearchResultsUserDropDown = ({
	users,
}: {
	users: UserSearchResult[] | null;
}) => {
	return (
		<>
			{users && (
				<ul>
					{users.map((user) => (
						<li className="flex" key={user.id}>
							<Image src={user.avatar_url} alt="avatar" />
							<div>
								<h3>{user.name}</h3>
								<p>{user.login}</p>
							</div>
						</li>
					))}
				</ul>
			)}
			<ul className="w-full bg-white rounded-md">
				{Array(5)
					.fill('hello')
					.map((item, index) => (
						<li
							className="py-6 border-b-[1px] mx-8 last:border-b-transparent"
							key={index}
						>
							{item}
						</li>
					))}
			</ul>
		</>
	);
};

export default SearchResultsUserDropDown;
