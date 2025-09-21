import {index, route} from '@react-router/dev/routes';
import type {RouteConfig} from '@react-router/dev/routes';
// importing directly to prevent circular dependency
import {Routes} from './constants/routeConstants';

export default [
	index('routes/home.tsx'),

	route(Routes.HOME, 'routes/home-route.tsx'),
	route(Routes.LOGIN, 'routes/login-route.tsx'),
	route(Routes.SPENDING, 'routes/spending-route.tsx'),

	route(
		'/.well-known/appspecific/com.chrome.devtools.json',
		'routes/debug-route.tsx',
	),
] satisfies RouteConfig;
