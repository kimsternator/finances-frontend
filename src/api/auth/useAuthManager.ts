import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {
	selectAccessToken,
	selectAccessTokenExpiryTime,
	selectCurrentUser,
	selectRefreshToken,
	selectRefreshTokenExpiryTime,
	useTypedSelector,
} from '@State';
import {checkTokenExpired} from '@Utils';
import {useGetUserQuery, useRefreshTokenMutation} from './authService';

export const useAuthManager = () => {
	const currentUser = useTypedSelector(selectCurrentUser);
	const accessToken = useTypedSelector(selectAccessToken);
	const accessTokenExpiryTime = useTypedSelector(selectAccessTokenExpiryTime);
	const refreshToken = useTypedSelector(selectRefreshToken);
	const refreshTokenExpiryTime = useTypedSelector(selectRefreshTokenExpiryTime);
	const location = useLocation();
	const navigate = useNavigate();
	const [refreshTokenFn] = useRefreshTokenMutation();

	console.log('here in refreshTokenManager', location);

	const handleRefreshToken = () => {
		if (!currentUser) {
			// navigate('/login');
			console.log('current user not found');
			return;
		}
		refreshTokenFn({username: currentUser.username, refreshToken})
			.unwrap()
			.then((response) => {
				// const parsedResponse = parseTokenResponse(response);
				console.log('here response', response);
			});
	};

	useEffect(() => {
		if (!currentUser) {
			console.warn('No current user found. Fetching now.');
			return;
		}
		if (!refreshToken || checkTokenExpired(refreshTokenExpiryTime)) {
			console.warn(
				'No valid refresh token available. User will need to log in.',
			);
			// navigate('/login');
			return;
		}

		const refreshTokenTimeout = setInterval(() => {
			handleRefreshToken();
		}, accessTokenExpiryTime - Date.now());
		return () => {
			clearInterval(refreshTokenTimeout);
		};
	}, [refreshToken]);

	return null;
};
