import {createApi} from '@reduxjs/toolkit/query/react';
import {AUTH_BASE_URL, AUTH_SERVICE_REDUCER_KEY, HTTP_METHOD} from '@Constants';
import type {
	GetUserRequest,
	GetUserResponse,
	LoginRequest,
	LoginResponse,
	RefreshTokenRequest,
	RefreshTokenResponse,
	RootState,
} from '@Types';
import {selectAccessToken} from '@State';
import {setAuthorizationHeader} from '@Utils';
import {getRetryableQuery} from '../query';

export const authService = createApi({
	reducerPath: AUTH_SERVICE_REDUCER_KEY,
	baseQuery: getRetryableQuery({
		baseUrl: AUTH_BASE_URL,
		prepareHeaders: (headers, {getState}) => {
			const state = getState() as RootState;
			const accessToken = selectAccessToken(state);
			setAuthorizationHeader(headers, accessToken);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (request) => ({
				url: '/login',
				method: HTTP_METHOD.POST,
				body: request,
			}),
		}),
		refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
			query: (request) => ({
				url: '/refresh-token',
				method: HTTP_METHOD.POST,
				body: request,
			}),
		}),
		getUser: builder.query<GetUserResponse, GetUserRequest>({
			query: ({username}) => ({
				url: `/get-user/${username}`,
				method: HTTP_METHOD.GET,
			}),
		}),
		getCurrentUser: builder.query<GetUserResponse, GetUserRequest>({
			query: ({username}) => ({
				url: `/get-user/${username}`,
				method: HTTP_METHOD.GET,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRefreshTokenMutation,
	useGetUserQuery,
	useGetCurrentUserQuery,
} = authService;
