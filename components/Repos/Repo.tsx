import React from 'react';
import { Repo } from '../../model';
import { motion } from 'framer-motion';
import { userAgent } from 'next/server';
import gitHubColors from '../../data/gitHubColors.json' assert { type: 'JSON' };

interface Props {
	repo: Repo;
	// index will be used if staggereffect is wanted.
	index?: number;
}
const Repo: React.FC<Props> = ({ repo, index }) => {
	// not exactly sure how to import this JSON file, but this works for now.
	// We are going to use this object, to match the language we got back from each repo.
	// This color will be set in a variable, and used in each list item.
	let gitHubColorsObject = JSON.parse(JSON.stringify(gitHubColors));

	let languageColor = repo.language
		? `bg-[${gitHubColorsObject[repo.language].color}]`
		: 'bg-gray-500';

	return (
		<motion.li
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: index ? 0.02 * index : 0 }}
			className="border-b-[1px] border-btnBorder py-4"
		>
			<div className="flex items-center gap-2 mb-4">
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
			<div>
				{repo.language && (
					<div className="flex items-center gap-1">
						<div
							className={`${languageColor} w-[10px] h-[10px] rounded-full`}
						></div>
						<span className="text-xs font-thin">{repo.language}</span>
					</div>
				)}
			</div>
		</motion.li>
	);
};

export default Repo;
