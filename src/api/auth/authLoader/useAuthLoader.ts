import {useEffect} from 'react';
import {
	authSlice,
	selectIsAuthLoading,
	useTypedDispatch,
	useTypedSelector,
} from '@State';
import {getAuthDataFromStorage, validateAuthData} from '@Utils';
import {authService} from '../authService';

/*
 * This class aims to load the authentication state from browser storage.
 * This includes loading access and refresh tokens as well as the username.
 * Should the username be present, the current user will attempt to be populated.
 */
export const useAuthLoader = () => {
	const isAuthLoading = useTypedSelector(selectIsAuthLoading);
	const dispatch = useTypedDispatch();

	const loadAuthState = async () => {
		const {username, ...authData} = getAuthDataFromStorage();
		const isValidAuthData = validateAuthData(authData);
		if (isValidAuthData) {
			dispatch(authSlice.actions.setAuthTokenValues(authData));
		}
		const isValidUsername = username !== null && username.length > 0;
		if (!isValidUsername) {
			dispatch(authSlice.actions.setIsAuthLoading(false));
			return;
		}
		await dispatch(authService.endpoints.getCurrentUser.initiate({username}));
		dispatch(authSlice.actions.setIsAuthLoading(false));
	};

	useEffect(() => {
		if (!isAuthLoading) {
			return;
		}
		loadAuthState();
	}, [dispatch, isAuthLoading]);

	return null;
};
