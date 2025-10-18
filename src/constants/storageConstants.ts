export const StorageType = {
	LOCAL: 'local',
	SESSION: 'session',
};

export const DEFAULT_STORAGE_TYPE = StorageType.SESSION;

export const STORAGE_CLIENT_MAP = {
	[StorageType.SESSION]: () => sessionStorage,
	[StorageType.LOCAL]: () => localStorage,
};
