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
	description?: string;
	updated_at: string;
	language?: string;
	forks_count: number;
}

export type ToastStatus = 'succes' | 'error';
