export interface User {
	id: number;
	name: string | null;
	login: string;
	bio: string | null;
	avatar_url: string;
	url: string;
	html_url: string;
	repos_url: string;
	followers: number;
	following: number;
	company: string | null;
	blog: string | null;
	location: string | null;
	email: string | null;
	twitter_username: string | null;
	public_repos: number;
	repos: Repo[];
}

export interface UserSearchResult {
	id: number;
	login: string;
	avatar_url: string;
}

export interface Repo {
	id: number;
	name: string;
	html_url: string;
	description: string | null;
	updated_at: string;
	language: string | null;
	forks_count: number;
	visibility: string;
	fork: boolean;
	forks_url: string;
	languageColor: string;
}

export type MessageStatus = 'success' | 'error';
