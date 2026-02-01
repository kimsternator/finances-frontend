import {useState} from 'react';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {GridMoreVertIcon} from '@mui/x-data-grid';
import type {TagResponse} from '@Types';

export const TagTableActions = ({row}: {row: TagResponse}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
