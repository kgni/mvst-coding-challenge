import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { User } from '../../model';

const UserAside = ({ user }: { user: User }) => {
	return (
		<aside className="w-1/3">
			<img className="w-72 rounded-full mb-8" src={user.avatar_url} alt="" />
			<div className="mb-4">
				<h3 className="text-btnText text-2xl">{user.name}</h3>
				<p>{user.login}</p>
			</div>
			<p className="text-btnText mb-6">{user.bio}</p>
			{/* <button className="bg-btnPrimary w-full rounded-md border-[1px] border-btnBorder text-sm py-1 text-btnText mb-4 hover:bg-btnHover hover:border-btnBorderHover duration-75 font-light tracking-wide">
						Edit profile
					</button> */}
			<div className="flex items-center gap-1 text-sm mb-4">
				<div className=" flex items-center">
					<FiUsers className="mr-2" />
					<span className="text-btnText">{user.followers}&nbsp;</span> followers
				</div>
				<span>&middot;</span>
				<div className=" flex ">
					<span className="text-btnText">{user.following}&nbsp;</span> following
				</div>
			</div>
			<div className="text-btnText font-light tracking-wide flex flex-col gap-1 text-sm mb-6">
				<div className="flex items-center gap-2">
					<IoLocationOutline className="text-lg" />
					{user.location}
				</div>
				<div className="flex items-center gap-2">
					<IoIosLink className="text-lg" />
					<a
						href="https://www.mdia.dk/"
						target="_blank"
						rel="noreferrer"
						className="hover:text-title"
					>
						{' '}
						{user.blog}
					</a>
				</div>
				<div className="flex items-center gap-2">
					<AiOutlineTwitter className="text-lg" />
					<a
						href={`https://twitter.com/${user.twitter_username}`}
						target="_blank"
						rel="noreferrer"
						className="hover:text-title"
					>
						@{user.twitter_username}
					</a>
				</div>
			</div>
			<div className="w-full h-[1px] bg-btnPrimary"></div>
		</aside>
	);
};

export default UserAside;
