import type {GridCellParams, GridColDef} from '@mui/x-data-grid';
import {formatRelativeDate} from '@Utils';
import {SpendingTableActions} from './SpendingTableActions';
import type {Dayjs} from 'dayjs';

export const columnConfig: GridColDef[] = [
	{
		field: 'name',
		headerName: 'Name',
		sortable: true,
		flex: 1,
	},
	{
		field: 'type',
		headerName: 'Type',
		sortable: true,
		flex: 1,
	},
	{
		field: 'amount',
		headerName: 'Amount',
		sortable: true,
		flex: 1,
	},
	{
		field: 'date',
		headerName: 'Date',
		sortable: true,
		valueFormatter: (value: Dayjs) => formatRelativeDate(value),
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
