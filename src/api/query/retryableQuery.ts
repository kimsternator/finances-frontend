import {fetchBaseQuery, retry} from '@reduxjs/toolkit/query';
import type {FetchBaseQueryArgs} from '@reduxjs/toolkit/query';
import {HTTP_STATUS, MAX_RETRIES} from '@Constants';

export const getRetryableQuery = (queryArgs: FetchBaseQueryArgs) => {
	const baseQuery = fetchBaseQuery(queryArgs);
	const retryableQuery = retry(baseQuery, {
		// maxRetries: MAX_RETRIES,
		retryCondition: ({status}: any, {attempt}) => {
			if (status === HTTP_STATUS.UNAUTHORIZED) {
				return false;
			}
			if (attempt >= MAX_RETRIES) {
				return false;
			}
			return true;
		},
	});
	return retryableQuery;
};
