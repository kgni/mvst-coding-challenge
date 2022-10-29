import Image from 'next/image';
import React from 'react';
import { UserSearchResult } from '../../model';
import { motion } from 'framer-motion';

// animation for dropdown
const dropdownAnimation = {
	key: 'dropdown',
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.1, staggerChildren: 1 },
	exit: { opacity: 0, transition: { duration: 0.1 } },
};

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
			<motion.ul {...dropdownAnimation} className="w-full bg-white rounded-md">
				{Array(5)
					.fill('hello')
					.map((item, index) => (
						<>
							<motion.li
								// the first item will not come in form the top (index 0 === 0), this is to prevent overflowing so we have more control over the stagger delay.
								initial={{ opacity: 0, translateY: index !== 0 ? -25 : 0 }}
								transition={{
									duration: 0.15,
									delay: index * 0.025,
									ease: 'easeOut',
								}}
								animate={{ opacity: 1, translateY: 0 }}
								className="py-6 hover:bg-btnText cursor-pointer duration-100 first:rounded-t-md last:rounded-b-md border-b-[1px] last:border-b-transparent"
								key={index}
							>
								<div>{item}</div>
							</motion.li>
							{/* <div className="last:hidden w-96 h-[1px] bg-black opacity-25 mx-8"></div> */}
						</>
					))}
			</motion.ul>
		</>
	);
};

export default SearchResultsUserDropDown;
