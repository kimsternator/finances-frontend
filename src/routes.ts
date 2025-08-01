import {index, route} from '@react-router/dev/routes';
import type {RouteConfig} from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),

	route('home', 'routes/home-route.tsx'),

	route(
		'/.well-known/appspecific/com.chrome.devtools.json',
		'routes/debug-route.tsx',
	),
] satisfies RouteConfig;
