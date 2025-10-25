import type {TransactionType} from '@Constants';

export type UserResponse = {
	email: string;
	username: string;
	created: number;
	firstName?: string;
	lastName?: string;
	lastActive: number;
};

export type TokenResponse = {
	accessToken: string;
	accessTokenExpiryTime: number;
	refreshToken: string;
	refreshTokenExpiryTime: number;
};

export type TagResponse = {
	id: string;
	name: string;
	description: string | null;
	color: string | null;
};

export type TransactionResponse = {
	id: string;
	name: string | null;
	description: string | null;
	amount: number;
	type: TransactionType;
	tags: TagResponse[];
	date: string;
};

export type PaginatedResponse = {
	nextPage: number | null;
};
