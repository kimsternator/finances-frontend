import type {Location} from 'react-router';
import type {RoutesValues} from '@Types';

export const isRoute = (
	location: Location<any>,
	route: RoutesValues,
): boolean => {
	return location.pathname === route;
};
