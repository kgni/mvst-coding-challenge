import React, { useState } from 'react';

import { User } from '../../model';
import Image from 'next/image';
import useMediaQuery from '../../hooks/useMediaQuery';

import UserAsideTextDesktop from './UserAsideTextDesktop';
import UserAsideTextMobile from './UserAsideTextMobile';
import useScrollPosition from '../../hooks/useScrollPosition';
import UserTopBarMobile from './UserTopBarMobile';
import { scrollToWindow } from '../../helpers/scrollTo';

interface Props {
	user: User;
}

const UserAside: React.FC<Props> = ({ user }) => {
	// media query hooks, that returns a boolean depending on viewport

	// returns true when viewport width is between 628px and 768px
	const isMediumMobile = useMediaQuery('(max-width: 768px)');

	// returns true when viewport width is under 628px
	const isSmallMobile = useMediaQuery('(max-width: 628px)');

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
					{scrollPosition > 600 && (
						<UserTopBarMobile
							isOpen={isTopBarOpen}
							setIsOpen={setIsTopBarOpen}
							onClick={() => scrollToWindow(0, 0, 'smooth')}
							user={user}
							closeButton={true}
						/>
					)}
				</>
			)}

			{/* TODO - currently there is a small bug where on small devices it will show a glimpse of the medium text*/}

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
