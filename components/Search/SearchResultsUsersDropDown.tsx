import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Oval } from 'react-loader-spinner';

// models
import { UserSearchResult } from '../../model';

// animation for dropdown
const dropdownAnimation = {
	key: 'dropdown',
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.1 },
	exit: { opacity: 0, transition: { duration: 0.1 } },
};

interface Props {
	users: UserSearchResult[];
}

const SearchResultsUsersDropDown: React.FC<Props> = ({ users }) => {
	const [isLoading, setisLoading] = useState(false);
	const [clickedId, setClickedId] = useState<string | null>(null);

	// function for setting states that will mount a spinner on the user that was clicked on.
	function onClickSetSpinner(event: MouseEvent<HTMLInputElement>) {
		setisLoading(true);
		// setting the clicked elements ID into state.
		setClickedId(event.currentTarget.id);
	}
	return (
		<>
			{users.length > 0 && (
				<motion.ul
					{...dropdownAnimation}
					className="w-full bg-white rounded-md mt-2 mb-4 max-h-96 sm:max-h-64 overflow-auto searchPageScrollBar"
				>
					{users.map((user, index) => (
						<Link key={user.id} href={`/user/${user.login}`}>
							<motion.li // the first item will not come in form the top (index 0 === 0), this is to prevent overflowing so we have more control over the stagger delay.
								initial={{ opacity: 0, translateY: index !== 0 ? -25 : 0 }}
								// not sure how to pass around events yet.. it works, but I can't seem to remove this error. ignoring it for now so we can deploy to vercel
								// @ts-ignore
								onClick={(event) => onClickSetSpinner(event)}
								// parsing user.id to a string
								id={user.id.toString()}
								transition={{
									duration: 0.15,
									delay: index * 0.025,
									ease: 'easeOut',
								}}
								animate={{ opacity: 1, translateY: 0 }}
								className="px-6 py-3 hover:bg-gray-200 cursor-pointer duration-100 first:rounded-t-md last:rounded-b-md border-b-[1px] last:border-b-transparent md:hover:bg-transparent md:active:bg-gray-200"
							>
								<div className="flex items-center gap-4 relative">
									<Image
										src={user.avatar_url}
										alt="avatar"
										className="w-16 h-16 rounded-full"
										width={64}
										height={64}
									/>
									<div className="flex flex-col items-start">
										{/* <h3 className="font-bold">{user.name}</h3> */}
										<p className="text-sm"> {user.login}</p>
									</div>
									{/* if loading is true and the clickedId is equal to the user.id, we add a spinner to the element that was clicked */}
									{isLoading && user.id.toString() === clickedId && (
										<div className="absolute right-0">
											<Oval
												width={25}
												height={25}
												color="#0d1117"
												secondaryColor="gray"
												strokeWidth={5}
											/>
										</div>
									)}
								</div>
							</motion.li>
						</Link>
					))}
				</motion.ul>
			)}
		</>
	);
};

export default SearchResultsUsersDropDown;
