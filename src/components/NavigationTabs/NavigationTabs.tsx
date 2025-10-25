import {useLocation, useNavigate} from 'react-router';
import {
	Box,
	MenuItem,
	MenuList,
	Slide,
	styled,
	Typography,
} from '@mui/material';
import {navigationTabOptions} from './navigationTabOptions';
import {selectIsTabsVisible, useTypedSelector} from '@State';
import {isRoute} from '@Utils';
import {Routes} from '@Constants';

const NavigationTabsContainer = styled(Box)(() => ({
	height: '100%',
	borderRight: '1px solid #ddd',
}));

export const NavigationTabs = () => {
	const isTabsVisible = useTypedSelector(selectIsTabsVisible);
	const location = useLocation();
	const navigate = useNavigate();
	const isLoginPage = isRoute(location, Routes.LOGIN);

	if (isLoginPage) {
		return null;
	}

	return (
		<Slide in={isTabsVisible} direction="right" mountOnEnter unmountOnExit>
			<NavigationTabsContainer>
				<MenuList>
					{navigationTabOptions.map((tab) => {
						const tabNavigation = () => {
							navigate(tab.route);
						};
						return (
							<MenuItem key={tab.id} {...tab} onClick={tabNavigation}>
								<Typography>{tab.label}</Typography>
							</MenuItem>
						);
					})}
				</MenuList>
			</NavigationTabsContainer>
		</Slide>
	);
};
