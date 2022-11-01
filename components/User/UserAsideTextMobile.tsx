import React from 'react';

// models
import { User } from '../../model';

// components
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaGlobeEurope } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';

interface Props {
	user: User;
}

const UserAsideTextMobile: React.FC<Props> = ({ user }) => {
	return (
		<div className="mb-4">
			<div className="mb-2 gap-8 items-center">
				<div className="flex items-end justify-center gap-2 mb-2">
					{user.name && <h3 className="text-btnText text-xl">{user.name}</h3>}
					<p>{user.login}</p>
				</div>
				<div className="text-btnText font-light tracking-wide flex flex-col text-sm">
					<div className="flex justify-center items-center gap-2 mb-2">
						{user.twitter_username && (
							<a
								href={`https://twitter.com/${user.twitter_username}`}
								target="_blank"
								rel="noreferrer"
								className="hover:text-title"
							>
								<AiOutlineTwitter className="text-2xl" />
							</a>
						)}
						{user.blog && (
							<div className="">
								<a
									href={user.blog}
									target="_blank"
									rel="noreferrer"
									className="hover:text-title"
								>
									{' '}
									<FaGlobeEurope className="text-xl hover:text-white" />
								</a>
							</div>
						)}
					</div>
					{user.location && (
						<div className="flex justify-center">{user.location}</div>
					)}
				</div>
			</div>
			<div className="flex items-center justify-center gap-1 text-sm">
				<div className=" flex items-center">
					<FiUsers className="mr-2" />
					<span className="text-btnText">{user.followers}&nbsp;</span> followers
				</div>
				<span>&middot;</span>
				<div className=" flex ">
					<span className="text-btnText">{user.following}&nbsp;</span> following
				</div>
			</div>
		</div>
	);
};

export default UserAsideTextMobile;
