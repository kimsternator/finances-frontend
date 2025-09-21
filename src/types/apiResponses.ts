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
