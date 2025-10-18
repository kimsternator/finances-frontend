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
import {checkTokenExpired, isRoute} from '@Utils';
import {useRefreshTokenMutation} from '../authService';
import {Routes, TOKEN_REFRESH_BUFFER_MS} from '@Constants';
import dayjs from 'dayjs';

export const useAuthManager = () => {
	const isAuthLoading = useTypedSelector(selectIsAuthLoading);
	const currentUser = useTypedSelector(selectCurrentUser);
	const accessTokenExpiryTime = useTypedSelector(selectAccessTokenExpiryTime);
	const refreshToken = useTypedSelector(selectRefreshToken);
	const refreshTokenExpiryTime = useTypedSelector(selectRefreshTokenExpiryTime);
	const location = useLocation();
	const navigate = useNavigate();
	const [refreshTokenFn] = useRefreshTokenMutation();

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
		const refreshTokenTimeout = setInterval(
			() => {
				console.info('Access token about to expired. Refreshing access token.');
				refreshTokenFn({username: currentUser.username, refreshToken});
			},
			dayjs(accessTokenExpiryTime).diff(dayjs()) - TOKEN_REFRESH_BUFFER_MS,
		);
		return () => {
			clearInterval(refreshTokenTimeout);
		};
	}, [
		accessTokenExpiryTime,
		currentUser,
		location,
		refreshToken,
		isAuthLoading,
	]);

	return null;
};
