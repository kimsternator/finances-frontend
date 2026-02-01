import type {GridCellParams, GridColDef} from '@mui/x-data-grid';
import {TagTableActions} from './TagTableActions';

export const columnConfig: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		sortable: true,
		flex: 1,
	},
	{
		field: 'description',
		headerName: 'Description',
		sortable: true,
		flex: 1,
	},
	{
		field: 'color',
		headerName: 'Color',
		flex: 1,
	},
	{
		field: 'actions',
		headerName: '',
		sortable: false,
		renderCell: (params: GridCellParams) => (
			<TagTableActions row={params.row} />
		),
		align: 'center',
	},
];
