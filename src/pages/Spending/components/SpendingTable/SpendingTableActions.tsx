import {useState} from 'react';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {GridMoreVertIcon} from '@mui/x-data-grid';
import type {SpendingExpense} from '@Types';

export const SpendingTableActions = ({row}: {row: SpendingExpense}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<GridMoreVertIcon />
			</IconButton>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={handleClose}>Edit</MenuItem>
				<MenuItem onClick={handleClose}>Delete</MenuItem>
			</Menu>
		</>
	);
};
