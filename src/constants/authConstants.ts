import type {AuthState} from '@Types';

export const AUTHORIZATION_HEADER = 'Authorization';
export const BEARER_PREFIX = 'Bearer ';

export const initialAuthState: AuthState = {
	accessToken: '',
	accessTokenExpiryTime: 0,
	refreshToken: '',
	refreshTokenExpiryTime: 0,
	currentUser: null,
};
