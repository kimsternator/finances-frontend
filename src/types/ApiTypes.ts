import type {TokenResponse, UserResponse} from './apiResponses';

export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = TokenResponse;

export type RegisterRequest = UserResponse;

export type RefreshTokenRequest = {
	refreshToken: string;
	username: string;
};

export type RefreshTokenResponse = TokenResponse;

export type GetUserRequest = {
	username: string;
};

export type GetUserResponse = UserResponse;
