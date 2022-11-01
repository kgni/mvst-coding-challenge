import React from 'react';

// models
import { User } from '../../model';

// components:
import { AiOutlineTwitter } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

interface Props {
	user: User;
}

const UserAsideTextDesktop: React.FC<Props> = ({ user }) => {
	return (
		<div className="">
			<div className="mb-4">
				{user.name && <h3 className="text-btnText text-2xl">{user.name}</h3>}
				<p>{user.login}</p>
			</div>
			{user.bio && <p className="text-btnText mb-4">{user.bio}</p>}

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
				{user.location && (
					<div className="flex items-center gap-2">
						<IoLocationOutline className="text-lg" />
						{user.location}
					</div>
				)}
				{user.blog && (
					<div className="flex items-center gap-2">
						<IoIosLink className="text-lg" />
						<a
							href={user.blog}
							target="_blank"
							rel="noreferrer"
							className="hover:text-title"
						>
							{' '}
							{user.blog}
						</a>
					</div>
				)}
				{user.twitter_username && (
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
				)}
			</div>
		</div>
	);
};

export default UserAsideTextDesktop;
