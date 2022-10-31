import React from 'react';
import { Repo as IRepo } from '../../model';
import Repo from './Repo';
interface Props {
	repos: IRepo[];
	page: number;
	itemsLimit: number;
}

const ReposList: React.FC<Props> = ({ repos, page, itemsLimit }) => {
	console.log(repos);
	return (
		<ul className="pr-3 md:mb-0 md:pr-0 repoList">
			{repos
				.map((repo, index) => <Repo key={repo.id} repo={repo} index={index} />)
				.slice((page - 1) * itemsLimit, page * itemsLimit)}
		</ul>
	);
};

export default ReposList;
