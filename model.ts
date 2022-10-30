// TODO - READ UP ON API, AND DECIDE WHICH FIELDS CAN BE NULL - THEN CONDTIONALLY RENDER IN YOUR CODE DEPENDING ON IF IT CAN BE NULL OR NOT?

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
	language: string | null;
	forks_count: number;
	visibility: string;
	languageColor: string;
}

export type ToastStatus = 'success' | 'error';
