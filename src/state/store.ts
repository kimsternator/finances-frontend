import {configureStore} from '@reduxjs/toolkit';
import {authService, tagService} from '@Api';
// import directly to prevent circular dependency
import {authSlice} from './auth/authSlice';
import {uiSlice} from './ui/uiSlice';
import {transactionService} from '~/api/transaction/transactionService';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		ui: uiSlice.reducer,
		// ---------- API ----------
		[authService.reducerPath]: authService.reducer,
		[tagService.reducerPath]: tagService.reducer,
		[transactionService.reducerPath]: transactionService.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authService.middleware)
			.concat(tagService.middleware)
			.concat(transactionService.middleware),
});
