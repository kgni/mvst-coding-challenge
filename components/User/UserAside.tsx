import React, { useState } from 'react';

import { User } from '../../model';
import Image from 'next/image';
import useMediaQuery from '../../hooks/useMediaQuery';

import UserAsideTextDesktop from './UserAsideTextDesktop';
import UserAsideTextMobile from './UserAsideTextMobile';
import useScrollPosition from '../../hooks/useScrollPosition';
import UserTopBarMobile from './UserTopBarMobile';
import scrollTo from '../../helpers/scrollTo';
import { AnimatePresence } from 'framer-motion';

interface Props {
	user: User;
}

const UserAside: React.FC<Props> = ({ user }) => {
	const isSmallMobile = useMediaQuery('(max-width: 628px)');
	const isMediumMobile = useMediaQuery('(max-width: 768px)');

	// getting scrollposition to decide when to show fixed UserTopBar
	const scrollPosition = useScrollPosition();
	// used to close the topbar, for now the user would have to reload or search up a new user to get it back.
	const [isTopBarOpen, setIsTopBarOpen] = useState(true);

	return (
		<aside className="w-1/3 md:w-full md:flex md:gap-12 items-center justify-center md:mb-8 sm:mb-2 sm:flex-col sm:gap-0">
			<Image
				// priority will preload the image.
				priority
				className="rounded-full md:max-w-[50%] mb-4 sm:w-full sm:mb-4 sm:max-w-auto"
				src={user.avatar_url}
				alt="avatar"
				width={288}
				height={288}
			/>

			{/* On medium mobile devices and below, we want to render a topbar on scroll */}
			{isMediumMobile && (
				<>
					<AnimatePresence>
						{scrollPosition > 600 && (
							<UserTopBarMobile
								isOpen={isTopBarOpen}
								setIsOpen={setIsTopBarOpen}
								onClick={() => scrollTo(0, 0, 'smooth')}
								user={user}
								closeButton={true}
							/>
						)}
					</AnimatePresence>
				</>
			)}
			{/* On everything above Small Mobile device, render this text */}
			{!isSmallMobile && <UserAsideTextDesktop user={user} />}
			{/* {On smaller mobile devices render this */}
			{isSmallMobile && (
				<>
					<UserAsideTextMobile user={user} />
				</>
			)}

			<div className="w-full h-[1px] bg-btnPrimary md:hidden"></div>
		</aside>
	);
};

export default UserAside;
