import {AUTHORIZATION_HEADER, BEARER_PREFIX} from '~/constants';

export const setAuthorizationHeader = (headers: Headers, token: string) => {
	headers.set(AUTHORIZATION_HEADER, `${BEARER_PREFIX}${token}`);
};

export const setQueryParameters = (
	url: string,
	queryParameterValues: Record<string, unknown>,
): string => {
	const queryParameters = new URLSearchParams();
	Object.entries(queryParameterValues).forEach(([key, value]) => {
		queryParameters.set(key, String(value));
	});
	return `${url}?${queryParameters.toString()}`;
};
