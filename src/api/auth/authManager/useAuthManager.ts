import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {
	selectAccessTokenExpiryTime,
	selectCurrentUser,
	selectIsAuthLoading,
	selectRefreshToken,
	selectRefreshTokenExpiryTime,
	useTypedSelector,
} from '@State';
import {
	checkTokenExpired,
	getStorageTypeFromStorage,
	isRoute,
	setAuthDataInStorage,
} from '@Utils';
import {useRefreshTokenMutation} from '../authService';
import {Routes, StorageType, TOKEN_REFRESH_BUFFER_MS} from '@Constants';
import dayjs from 'dayjs';

/*
 * The auth manager is responsible for maintaining an active access key through refreshing
 * by the given refresh token. When the refresh token is expired or invalid, the user will
 * be navigated to the login page
 */
export const useAuthManager = () => {
	const isAuthLoading = useTypedSelector(selectIsAuthLoading);
	const currentUser = useTypedSelector(selectCurrentUser);
	const accessTokenExpiryTime = useTypedSelector(selectAccessTokenExpiryTime);
	const refreshToken = useTypedSelector(selectRefreshToken);
	const refreshTokenExpiryTime = useTypedSelector(selectRefreshTokenExpiryTime);
	const location = useLocation();
	const navigate = useNavigate();
	const [
		refreshTokenFn,
		{isLoading: isRefreshTokenLoading, isError: isRefreshTokenError},
	] = useRefreshTokenMutation();

	useEffect(() => {
		if (isAuthLoading || isRoute(location, Routes.LOGIN)) {
			return;
		}
		if (!currentUser) {
			console.warn('No current user initialized. Prompting to log in.');
			navigate(Routes.LOGIN);
			return;
		}
		if (!refreshToken || checkTokenExpired(refreshTokenExpiryTime)) {
			console.warn('Refresh token expired. Prompting to log in.');
			navigate(Routes.LOGIN);
			return;
		}
		if (!isRefreshTokenError && !isRefreshTokenLoading) {
			const refreshTokenTimeout = setInterval(
				async () => {
					console.info(
						'Access token about to expired. Refreshing access token.',
					);
					const {data} = await refreshTokenFn({
						username: currentUser.username,
						refreshToken,
					});
					if (data) {
						const storageType = getStorageTypeFromStorage();
						setAuthDataInStorage({
							username: currentUser.username,
							rememberMe: storageType === StorageType.LOCAL,
							...data,
						});
					}
				},
				dayjs(accessTokenExpiryTime).diff(dayjs()) - TOKEN_REFRESH_BUFFER_MS,
			);
			return () => {
				clearInterval(refreshTokenTimeout);
			};
		}
	}, [
		accessTokenExpiryTime,
		currentUser,
		location,
		refreshToken,
		isAuthLoading,
	]);

	return null;
};
