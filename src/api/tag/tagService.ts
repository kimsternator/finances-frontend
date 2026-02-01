import {createApi} from '@reduxjs/toolkit/query/react';
import {getRetryableQuery} from '../query';
import {TAG_BASE_URL} from '@Constants';
import type {ListTagsRequest, ListTagsResponse, RootState} from '@Types';
import {selectAccessToken} from '@State';
import {setAuthorizationHeader, setQueryParameters} from '@Utils';

export const tagService = createApi({
	reducerPath: 'tagService',
	baseQuery: getRetryableQuery({
		baseUrl: TAG_BASE_URL,
		prepareHeaders: (headers, {getState}) => {
			const state = getState() as RootState;
			const accessToken = selectAccessToken(state);
			setAuthorizationHeader(headers, accessToken);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		listTags: builder.query<ListTagsResponse, ListTagsRequest>({
			query: (queryParameters) => ({
				url: setQueryParameters('/list', queryParameters),
				method: 'GET',
			}),
		}),
	}),
});

export const {useListTagsQuery} = tagService;
