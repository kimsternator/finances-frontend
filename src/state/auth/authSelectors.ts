import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '@Types';

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsAuthLoading = createSelector(
	selectAuthState,
	(state) => state.isAuthLoading,
);

export const selectAccessToken = createSelector(
	selectAuthState,
	(state) => state.accessToken,
);

export const selectAccessTokenExpiryTime = createSelector(
	selectAuthState,
	(state) => state.accessTokenExpiryTime,
);

export const selectRefreshToken = createSelector(
	selectAuthState,
	(state) => state.refreshToken,
);

export const selectRefreshTokenExpiryTime = createSelector(
	selectAuthState,
	(state) => state.refreshTokenExpiryTime,
);

export const selectCurrentUser = createSelector(
	selectAuthState,
	(state) => state.currentUser,
);
