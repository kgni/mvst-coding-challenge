// TODO - how do I get to condtionally display something depending on if it is null or not?
// Is this the corrent way of setting stuff optional?

export interface User {
	id: number;
	name: string;
	login: string;
	bio?: string;
	avatar_url: string;
	url: string;
	html_url: string;
	repos_url: string;
	followers: number;
	following: number;
	company?: string;
	blog?: string;
	location?: string;
	email?: string;
	twitter_username?: string;
	public_repos: number;
	repos: Repo[];
}

export interface UserSearchResult {
	id: number;
	name: string;
	login: string;
	avatar_url: string;
	url: string;
	html_url: string;
	repos_url: string;
}

export interface Repo {
	id: number;
	name: string;
	html_url: string;
	description: string | null;
	updated_at: string;
	language?: string;
	forks_count: number;
}

export type ToastStatus = 'success' | 'error';
