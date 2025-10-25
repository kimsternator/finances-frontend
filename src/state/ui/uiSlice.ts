import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {UI_STORE_NAME, initialUiState} from '@Constants';

export const uiSlice = createSlice({
	name: UI_STORE_NAME,
	initialState: initialUiState,
	reducers: {
		setIsTabsVisible: (state, action: PayloadAction<boolean>) => {
			state.isTabsVisible = action.payload;
		},
	},
});
