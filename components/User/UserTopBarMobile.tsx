import Image from 'next/image';
import React, { useState } from 'react';
import { User } from '../../model';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
	user: User;
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	closeButton: boolean;
	onClick?: () => void;
}
const UserTopBarMobile: React.FC<Props> = ({
	user,
	isOpen,
	setIsOpen,
	closeButton,
	onClick,
}) => {
	return (
		<>
			{isOpen && (
				<motion.div
					key="topbar"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="bg-white fixed top-2 p-6 rounded-md w-[95%] left-[50%] !translate-x-[-50%] flex items-center justify-between z-50"
					exit={{ opacity: 0, transition: { duration: 0.3 } }}
				>
					<div className="flex items-center gap-4">
						{' '}
						<Image
							className="rounded-full"
							src={user.avatar_url}
							alt="avatar"
							width={55}
							height={5}
						/>
						<p className="font-semibold text-black">{user.login}</p>
					</div>
					<p
						onClick={onClick}
						className="text-title font-semibold active:underline hover:underline cursor-pointer"
					>
						Go to top
					</p>
					{closeButton && (
						<AiOutlineClose
							onClick={() => setIsOpen(false)}
							className="cursor-pointer text-lg text-black absolute top-2 right-2 select-none"
						/>
					)}
				</motion.div>
			)}
		</>
	);
};

export default UserTopBarMobile;
