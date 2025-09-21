import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {initialAuthState} from '@Constants';
import type {AuthState, UserResponse} from '@Types';

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
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
		setCurrentUser: (state, action: PayloadAction<UserResponse | null>) => {
			state.currentUser = action.payload;
		},
		setAuthState: (_state, action: PayloadAction<AuthState>) => {
			// state.accessToken = action.payload.accessToken;
			// state.accessTokenExpiryTime = action.payload.accessTokenExpiryTime;
			// state.refreshToken = action.payload.refreshToken;
			// state.refreshTokenExpiryTime = action.payload.refreshTokenExpiryTime;
			// state.currentUser = action.payl
			return action.payload;
		},
	},
});
