import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AUTH_STORE_NAME, initialAuthState} from '@Constants';
import type {TokenResponse, UserResponse} from '@Types';
import {authService} from '@Api';

export const authSlice = createSlice({
	name: AUTH_STORE_NAME,
	initialState: initialAuthState,
	reducers: {
		setIsAuthLoading: (state, action: PayloadAction<boolean>) => {
			state.isAuthLoading = action.payload;
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},
		setAccessTokenExpiryTime: (state, action: PayloadAction<number>) => {
			state.accessTokenExpiryTime = action.payload;
		},
		setRefreshToken: (state, action: PayloadAction<string>) => {
			state.refreshToken = action.payload;
		},
		setRefreshTokenExpiryTime: (state, action: PayloadAction<number>) => {
			state.refreshTokenExpiryTime = action.payload;
		},
		setAuthTokenValues: (state, {payload}: PayloadAction<TokenResponse>) => {
			const {
				accessToken,
				accessTokenExpiryTime,
				refreshToken,
				refreshTokenExpiryTime,
			} = payload;
			state.accessToken = accessToken;
			state.accessTokenExpiryTime = accessTokenExpiryTime;
			state.refreshToken = refreshToken;
			state.refreshTokenExpiryTime = refreshTokenExpiryTime;
		},
		setCurrentUser: (state, action: PayloadAction<UserResponse | null>) => {
			state.currentUser = action.payload;
		},
		clearAuthData: (state) => {
			state.accessToken = '';
			state.accessTokenExpiryTime = 0;
			state.refreshToken = '';
			state.refreshTokenExpiryTime = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authService.endpoints.login.matchFulfilled,
			(state, {payload}) => {
				authSlice.caseReducers.setAuthTokenValues(state, {
					payload,
					type: authSlice.actions.setAuthTokenValues.type,
				});
			},
		);
		builder.addMatcher(
			authService.endpoints.refreshToken.matchFulfilled,
			(state, {payload}) => {
				authSlice.caseReducers.setAuthTokenValues(state, {
					payload,
					type: authSlice.actions.setAuthTokenValues.type,
				});
			},
		);
		builder.addMatcher(
			authService.endpoints.getCurrentUser.matchFulfilled,
			(state, {payload}) => {
				authSlice.caseReducers.setCurrentUser(state, {
					payload,
					type: authSlice.actions.setCurrentUser.type,
				});
			},
		);
	},
});
