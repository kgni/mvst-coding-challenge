import { Repo } from '../model';

export default function applyRepoFilters(
	repos: Repo[],
	searchTerm: string,
	type: string,
	sort: string
): Repo[] {
	// general question. Do we want to create a new array in each filtering instance, so we don't mutate the original?

	// if type is forks, we want to only get repos where fork is true
	if (type === 'forks') {
		repos = repos.filter((repo) => repo.fork);
	}

	// sort from most recent updated
	if (sort === 'lastUpdated') {
		repos.sort(
			(a, b) =>
				new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
		);
	}

	// sort by name
	if (sort === 'name') {
		repos.sort((a, b) => a.name.localeCompare(b.name));
	}

	// filter by keyword (and return the )
	return repos.filter(
		(repo) =>
			repo.name.includes(searchTerm) || repo.description?.includes(searchTerm)
	);
}
