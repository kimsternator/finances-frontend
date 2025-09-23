import dayjs from 'dayjs';
import type {AuthState} from '@Types';

export const AUTHORIZATION_HEADER = 'Authorization';
export const BEARER_PREFIX = 'Bearer ';

export const TOKEN_REFRESH_BUFFER_MS = dayjs().minute(1).millisecond();
export const STORAGE_USERNAME_KEY = 'FINANCES_USERNAME';
export const STORAGE_AUTH_DATA_KEY = 'FINANCES_AUTH_DATA';

export const AUTH_STORE_NAME = 'auth';

export const initialAuthState: AuthState = {
	accessToken: '',
	accessTokenExpiryTime: 0,
	refreshToken: '',
	refreshTokenExpiryTime: 0,
	currentUser: null,
};
