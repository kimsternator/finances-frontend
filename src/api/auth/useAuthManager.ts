import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {
	selectAccessTokenExpiryTime,
	selectCurrentUser,
	selectRefreshToken,
	selectRefreshTokenExpiryTime,
	useTypedSelector,
} from '@State';
import {checkTokenExpired, isRoute} from '@Utils';
import {useRefreshTokenMutation} from './authService';
import {Routes, TOKEN_REFRESH_BUFFER_MS} from '@Constants';

export const useAuthManager = () => {
	const currentUser = useTypedSelector(selectCurrentUser);
	const accessTokenExpiryTime = useTypedSelector(selectAccessTokenExpiryTime);
	const refreshToken = useTypedSelector(selectRefreshToken);
	const refreshTokenExpiryTime = useTypedSelector(selectRefreshTokenExpiryTime);
	const location = useLocation();
	const navigate = useNavigate();
	const [refreshTokenFn] = useRefreshTokenMutation();

	const handleRefreshToken = (username: string) => {
		refreshTokenFn({username: username, refreshToken})
			.unwrap()
			.then((response) => {
				// const parsedResponse = parseTokenResponse(response);
				console.log('here response', response);
			});
	};

	useEffect(() => {
		if (isRoute(location, Routes.LOGIN)) {
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
				handleRefreshToken(currentUser.username);
			},
			accessTokenExpiryTime - Date.now() - TOKEN_REFRESH_BUFFER_MS,
		);
		return () => {
			clearInterval(refreshTokenTimeout);
		};
	}, [accessTokenExpiryTime, currentUser, location, refreshToken]);

	return null;
};
