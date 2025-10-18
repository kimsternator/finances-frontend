import type {StorageTypeValues} from '@Types';
import {
	DEFAULT_STORAGE_TYPE,
	STORAGE_CLIENT_MAP,
	StorageType,
} from '@Constants';

export const getStorageClient = (
	storageType: StorageTypeValues = StorageType.SESSION,
): Storage => {
	const storageClientRetriever =
		STORAGE_CLIENT_MAP[storageType] ?? STORAGE_CLIENT_MAP[DEFAULT_STORAGE_TYPE];
	return storageClientRetriever();
};
