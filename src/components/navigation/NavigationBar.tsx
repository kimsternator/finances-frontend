import {Box, Divider, styled, Typography} from '@mui/material';
import {useLocation} from 'react-router';
import {Routes} from '@Constants';
import {isRoute} from '@Utils';
import HomeIcon from '@mui/icons-material/Home';
import {AccountMenu} from '../AccountMenu';
import {NavigationTabsVisibility} from '../NavigationTabs';
import {FloatLeftContainer, FloatRightContainer} from '@Components';

const horizontalNavBarContainerStyles = {
	display: 'flex',
	flexDirection: 'row',
} as const;

const NavigationBarContainer = styled(Box)(({theme}) => ({
	...horizontalNavBarContainerStyles,
	padding: theme.spacing(0.25, 0.5),
}));

const LeftContainer = styled(FloatLeftContainer)(({theme}) => ({
	...horizontalNavBarContainerStyles,
	gap: theme.spacing(0.5),
}));

const RightContainer = styled(FloatRightContainer)(({theme}) => ({
	...horizontalNavBarContainerStyles,
	gap: theme.spacing(0.5),
}));

export const NavigationBar = () => {
	const location = useLocation();

	const isLoginPage = isRoute(location, Routes.LOGIN);

	if (isLoginPage) {
		return null;
	}

	return (
		<NavigationBarContainer>
			<LeftContainer>
				<NavigationTabsVisibility />
				<HomeIcon />
				<Divider orientation="vertical" />
				<Typography>hello</Typography>
			</LeftContainer>
			<RightContainer>
				<AccountMenu />
			</RightContainer>
		</NavigationBarContainer>
	);
};
