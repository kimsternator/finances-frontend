import {configureStore} from '@reduxjs/toolkit';
import {authService} from '@Api';
// import directly to prevent circular dependency
import {authSlice} from './auth/authSlice';
import {uiSlice} from './ui/uiSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		ui: uiSlice.reducer,
		// ---------- API ----------
		[authService.reducerPath]: authService.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authService.middleware),
});
