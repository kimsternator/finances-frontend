import type {
	LoginData,
	LoginResponse,
	RecursiveNullable,
	TokenResponse,
} from '@Types';
import {
	DEFAULT_STORAGE_TYPE,
	STORAGE_AUTH_DATA_KEY,
	STORAGE_SESSION_PERSISTENCE_KEY,
	STORAGE_USERNAME_KEY,
	StorageType,
} from '@Constants';
import {getStorageClient} from './storageUtils';

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

type SetAuthDataInStorage = LoginResponse & {
	username: string;
	rememberMe: boolean;
};

export const setAuthDataInStorage = ({
	username,
	rememberMe,
	...authData
}: SetAuthDataInStorage) => {
	const storageType = rememberMe ? StorageType.LOCAL : StorageType.SESSION;
	const client = getStorageClient(storageType);
	// StorageType will always be persisted in local storage
	getStorageClient(StorageType.LOCAL).setItem(
		STORAGE_SESSION_PERSISTENCE_KEY,
		storageType,
	);
	client.setItem(STORAGE_USERNAME_KEY, username);
	client.setItem(STORAGE_AUTH_DATA_KEY, JSON.stringify(authData));
};

type GetAuthDataFromStorageResult = RecursiveNullable<LoginResponse> & {
	username: string | null;
};

export const getAuthDataFromStorage = (): GetAuthDataFromStorageResult => {
	let result: GetAuthDataFromStorageResult = {
		username: null,
		accessToken: null,
		accessTokenExpiryTime: null,
		refreshToken: null,
		refreshTokenExpiryTime: null,
	};
	// StorageType will always be persisted in local storage
	const storageType =
		(getStorageClient(StorageType.LOCAL).getItem(
			STORAGE_SESSION_PERSISTENCE_KEY,
		) as string | null) ?? DEFAULT_STORAGE_TYPE;
	const client = getStorageClient(storageType);
	try {
		result.username = client.getItem(STORAGE_USERNAME_KEY);
		result = {
			...result,
			...JSON.parse(client.getItem(STORAGE_AUTH_DATA_KEY) ?? '{}'),
		};
	} catch (exception: any) {
		console.info(
			`Error getting auth data from ${storageType} storage with exception: ${exception}`,
		);
		return result;
	}
	return result;
};

export const validateAuthData = (
	data: RecursiveNullable<LoginResponse>,
): data is LoginResponse => {
	const result =
		data.accessToken !== null &&
		data.accessTokenExpiryTime !== null &&
		data.refreshToken !== null &&
		data.refreshTokenExpiryTime !== null;
	return result;
};
