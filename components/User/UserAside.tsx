import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { User } from '../../model';
import Image from 'next/image';
import useMediaQuery from '../../hooks/useMediaQuery';

import UserAsideTextDesktop from './UserAsideTextDesktop';
import UserAsideTextMobile from './UserAsideTextMobile';

interface Props {
	user: User;
}

const UserAside: React.FC<Props> = ({ user }) => {
	const isMobile = useMediaQuery('(max-width: 628px)');

	return (
		<aside className="w-1/3 md:w-full md:flex md:gap-12 items-center justify-center md:mb-12 sm:flex-col sm:gap-4">
			<Image
				className="rounded-full md:max-w-[50%] sm:w-full sm:mb-0 sm:max-w-[250px]"
				src={user.avatar_url}
				alt="avatar"
				width={288}
				height={288}
			/>
			{!isMobile && <UserAsideTextDesktop user={user} />}
			{isMobile && <UserAsideTextMobile user={user} />}

			<div className="w-full h-[1px] bg-btnPrimary md:hidden"></div>
		</aside>
	);
};

export default UserAside;
