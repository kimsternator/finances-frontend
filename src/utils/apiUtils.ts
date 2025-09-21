import {AUTHORIZATION_HEADER, BEARER_PREFIX} from '~/constants';

export const setAuthorizationHeader = (headers: Headers, token: string) => {
	headers.set(AUTHORIZATION_HEADER, `${BEARER_PREFIX}${token}`);
};
