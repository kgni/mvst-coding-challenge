import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaGlobeEurope } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { User } from '../../model';

interface Props {
	user: User;
}

const UserAsideTextMobile: React.FC<Props> = ({ user }) => {
	return (
		<div className="mb-4">
			<div className="mb-2 gap-8 items-center">
				<div className="flex items-end justify-center gap-2 mb-2">
					{user.name && <h3 className="text-btnText text-xl">{user.name}</h3>}
					<p> - {user.login}</p>
				</div>
				<div className="text-btnText font-light tracking-wide flex flex-col gap-1 text-sm">
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
									<FaGlobeEurope className="text-xl hover:text-btnText" />
								</a>
							</div>
						)}
					</div>
					{user.location && (
						<div className="flex items-center justify-center gap-2">
							<IoLocationOutline className="text-lg" />
							{user.location}
						</div>
					)}
				</div>
			</div>
			{/* {user.bio && (
				<p className="text-btnText mb-2 center text-sm">{user.bio}</p>
			)} */}

			{/* <button className="bg-btnPrimary w-full rounded-md border-[1px] border-btnBorder text-sm py-1 text-btnText mb-4 hover:bg-btnHover hover:border-btnBorderHover duration-75 font-light tracking-wide">
  Edit profile
</button> */}

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
