import gitHubColors from '../data/gitHubColors.json';

const gitHubColorsObject = JSON.parse(JSON.stringify(gitHubColors));

// export default async function fetchRepos(page?: number) {
// 	try {
// 		setIsLoading(true);
// 		const { data: reposData } = await axios.get(
// 			`https://api.github.com/users/${user.login}/repos?&page=${page}`
// 		);

// 		console.log(
// 			`https://api.github.com/users/${user.login}/repos?&page=${page}`
// 		);

// 		// Sanitizing our repos data, to only contain what we need - not sure if this is the best way to do it.. We are still fetching all data from each repo anyways.
// 		const repos: Repo[] = reposData.map((repo: Repo) => {
// 			// standard langauge color (if no langaugecolor was found)
// 			let languageColor = '#8B949E';

// 			// if there is a langauge, and there is a color for that languge from the JSON file we set the language color to the HEX value specified for that language in the JSON file.
// 			if (repo.language && gitHubColorsObject[repo.language]?.color) {
// 				languageColor = gitHubColorsObject[repo.language].color;
// 			}

// 			return {
// 				id: repo.id,
// 				name: repo.name,
// 				html_url: repo.html_url,
// 				description: repo.description,
// 				updated_at: repo.updated_at,
// 				language: repo.language,
// 				fork: repo.fork,
// 				forks_url: repo.forks_url,
// 				visibility: repo.visibility,
// 				languageColor,
// 			};
// 		});

// 		setRepos(repos);
// 		setIsLoading(false);
// 	} catch (e) {
// 		console.log(e);
// 	}
// }
