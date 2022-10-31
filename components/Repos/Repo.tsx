import React from 'react';
import { Repo } from '../../model';
import { motion } from 'framer-motion';

import { TbGitFork } from 'react-icons/tb';
import { formatDistance, subDays } from 'date-fns';
import { fork } from 'child_process';
interface Props {
	repo: Repo;
	// index will be used if staggereffect is wanted.
	index?: number;
}
const Repo: React.FC<Props> = ({ repo, index }) => {
	// parse date:
	const updatedAt = formatDistance(
		subDays(new Date(repo.updated_at), 0),
		new Date()
	);

	return (
		<motion.li
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: index ? 0.02 * index : 0 }}
			className="border-b-[1px] border-btnBorder py-8"
		>
			<div className="mb-4">
				<div className="flex items-center gap-2">
					<h4 className="text-title cursor-pointer hover:underline font-semibold">
						<a href={repo.html_url} target="_blank" rel="noreferrer">
							{' '}
							{repo.name}
						</a>
					</h4>
					<span className="text-xs font-bold rounded-full px-2 border-[1px] border-btnBorder">
						{/* uppercasing repo visibility */}
						{repo.visibility[0].toUpperCase() + repo.visibility.slice(1)}
					</span>
				</div>
				{repo.description && <p className="text-sm mt-2">{repo.description}</p>}
			</div>
			<div className="flex items-center gap-3 text-xs font-thin">
				{repo.language && (
					<div className="flex items-center gap-1">
						<div
							className={`w-[10px] h-[10px] rounded-full`}
							// adding inline style like this because tailwind can't create the seperate classes for each color
							style={{ backgroundColor: `${repo.languageColor}` }}
						></div>
						<span className="">{repo.language}</span>
					</div>
				)}
				{repo.fork && (
					<div>
						<a href={repo.html_url} target="_blank" rel="noreferrer">
							<TbGitFork className="text-xl cursor-pointer hover:text-title" />{' '}
						</a>
					</div>
				)}
				<span>Updated {updatedAt} ago</span>
			</div>
		</motion.li>
	);
};

export default Repo;
