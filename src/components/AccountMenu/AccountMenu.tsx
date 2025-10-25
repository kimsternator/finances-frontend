import {useState} from 'react';
import type {MouseEvent} from 'react';
import {useNavigate} from 'react-router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IconButton, Menu, MenuItem, Typography} from '@mui/material';
import {getAccountMenuOptions} from './accountMenuOptions';
import type {AccountMenuOption} from '@Types';
import {Routes} from '@Constants';
import {authSlice, useTypedDispatch} from '@State';
import {clearAuthDataFromStorage} from '@Utils';

export const AccountMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	const dispatch = useTypedDispatch();

	const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogOut = () => {
		clearAuthDataFromStorage();
		dispatch(authSlice.actions.clearAuthData());
		navigate(Routes.LOGIN);
	};

	const isMenuOpen = Boolean(anchorEl);
	const accountMenuOptions = getAccountMenuOptions({
		onLogOut: handleLogOut,
	});

	return (
		<>
			<IconButton onClick={handleMenuOpen}>
				<AccountCircleIcon />
			</IconButton>
			<Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
				{accountMenuOptions.map((option: AccountMenuOption) => (
					<MenuItem key={option.id} {...option}>
						<Typography>{option.label}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
