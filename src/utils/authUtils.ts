import type {LoginData, LoginResponse} from '@Types';
import {STORAGE_AUTH_DATA_KEY, STORAGE_USERNAME_KEY} from '@Constants';

export const checkTokenExpired = (expiryTime: number): boolean => {
	return Date.now() >= expiryTime;
};

export const isValidLoginData = (loginData: LoginData): boolean => {
	const {username, password} = loginData;
	if (!username || !password) {
		return false;
	}
	return true;
};

type PersistUsernameInStorageProps = LoginResponse & {
	username: string;
	rememberMe: boolean;
};

export const persistUsernameInStorage = ({
	username,
	rememberMe,
	...authData
}: PersistUsernameInStorageProps) => {
	const client = rememberMe ? localStorage : sessionStorage;
	client.setItem(STORAGE_USERNAME_KEY, username);
	client.setItem(STORAGE_AUTH_DATA_KEY, JSON.stringify(authData));
};
