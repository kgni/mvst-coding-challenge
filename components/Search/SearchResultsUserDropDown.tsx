import { UserSearchResult } from '../../model';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// animation for dropdown
const dropdownAnimation = {
	key: 'dropdown',
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.1, staggerChildren: 1 },
	exit: { opacity: 0, transition: { duration: 0.1 } },
};

interface Props {
	users: UserSearchResult[];
}

const SearchResultsUserDropDown: React.FC<Props> = ({ users }) => {
	return (
		<>
			{users.length > 0 && (
				<motion.ul
					{...dropdownAnimation}
					className="w-full bg-white rounded-md mt-2 mb-4 max-h-96 sm:max-h-64 overflow-auto"
				>
					{users.map((user, index) => (
						<Link key={user.id} href={`/user/${user.login}`}>
							<motion.li // the first item will not come in form the top (index 0 === 0), this is to prevent overflowing so we have more control over the stagger delay.
								initial={{ opacity: 0, translateY: index !== 0 ? -25 : 0 }}
								transition={{
									duration: 0.15,
									delay: index * 0.025,
									ease: 'easeOut',
								}}
								animate={{ opacity: 1, translateY: 0 }}
								className="px-6 py-3 hover:bg-gray-200 cursor-pointer duration-100 first:rounded-t-md last:rounded-b-md border-b-[1px] last:border-b-transparent"
							>
								<div className="flex items-center gap-4">
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
								</div>
							</motion.li>
						</Link>
					))}
				</motion.ul>
			)}
		</>
	);
};

export default SearchResultsUserDropDown;
