import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '@Types';

export const selectUiState = (state: RootState) => state.ui;

export const selectIsTabsVisible = createSelector(
	selectUiState,
	(state) => state.isTabsVisible,
);
