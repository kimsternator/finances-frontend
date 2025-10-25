import {Box, Divider, styled, Typography} from '@mui/material';
import {useLocation} from 'react-router';
import {Routes} from '@Constants';
import {isRoute} from '@Utils';
import HomeIcon from '@mui/icons-material/Home';
import {AccountMenu} from '../AccountMenu';
import {NavigationTabsVisibility} from '../NavigationTabs';

const HorizontalNavBarContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
}));

const NavigationBarContainer = styled(HorizontalNavBarContainer)(({theme}) => ({
	padding: theme.spacing(0.25, 0.5),
}));

const LeftContainer = styled(HorizontalNavBarContainer)(({theme}) => ({
	marginRight: 'auto',
	gap: theme.spacing(0.5),
}));

const RightContainer = styled(HorizontalNavBarContainer)(() => ({
	marginLeft: 'auto',
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
