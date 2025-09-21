import type {LoginData} from '@Types';

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
