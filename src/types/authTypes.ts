import type {UserResponse} from './apiResponses';
import type {LoginRequest} from './apiTypes';

export type AuthState = {
	isAuthLoading: boolean;
	accessToken: string;
	accessTokenExpiryTime: number;
	refreshToken: string;
	refreshTokenExpiryTime: number;
	currentUser: UserResponse | null;
};

export type LoginData = LoginRequest & {
	rememberMe: boolean;
};
