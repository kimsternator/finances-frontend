import {IconButton} from '@mui/material';
import {
	selectIsTabsVisible,
	uiSlice,
	useTypedDispatch,
	useTypedSelector,
} from '@State';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

export const NavigationTabsVisibility = () => {
	const isTabsVisible = useTypedSelector(selectIsTabsVisible);
	const dispatch = useTypedDispatch();

	const handleToggleTabsVisibility = () => {
		dispatch(uiSlice.actions.setIsTabsVisible(!isTabsVisible));
	};

	return (
		<IconButton onClick={handleToggleTabsVisibility}>
			<DensitySmallIcon />
		</IconButton>
	);
};
