import type {GridCellParams, GridColDef} from '@mui/x-data-grid';
import {formatRelativeDate} from '@Utils';
import {SpendingTableActions} from './SpendingTableActions';

export const columnConfig: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 1,
	},
	{
		field: 'type',
		headerName: 'Type',
		flex: 1,
	},
	{
		field: 'amount',
		headerName: 'Amount',
		flex: 1,
	},
	{
		field: 'date',
		headerName: 'Date',
		valueFormatter: (value: Date) => formatRelativeDate(value),
		flex: 1,
	},
	{
		field: 'actions',
		headerName: '',
		sortable: false,
		renderCell: (params: GridCellParams) => (
			<SpendingTableActions row={params.row} />
		),
		align: 'center',
	},
];
