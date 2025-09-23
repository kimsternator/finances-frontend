import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AUTH_BASE_URL} from '@Constants';
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

export const authService = createApi({
	reducerPath: 'authService',
	baseQuery: fetchBaseQuery({
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
				method: 'POST',
				body: request,
			}),
		}),
		refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
			query: (request) => ({
				url: '/refresh-token',
				method: 'POST',
				body: request,
			}),
		}),
		getUser: builder.query<GetUserResponse, GetUserRequest>({
			query: ({username}) => ({
				url: `/get-user/${username}`,
				method: 'GET',
			}),
		}),
		getCurrentUser: builder.query<GetUserResponse, GetUserRequest>({
			query: ({username}) => ({
				url: `/get-user/${username}`,
				method: 'GET',
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
