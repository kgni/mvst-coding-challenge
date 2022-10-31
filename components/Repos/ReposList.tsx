import React from 'react';
import { Repo as IRepo } from '../../model';
import Repo from './Repo';
interface Props {
	repos: IRepo[];
}

const ReposList: React.FC<Props> = ({ repos }) => {
	return (
		<ul className="mb-7 pr-3">
			{repos.map((repo, index) => (
				<Repo key={repo.id} repo={repo} index={index} />
			))}
		</ul>
	);
};

export default ReposList;
