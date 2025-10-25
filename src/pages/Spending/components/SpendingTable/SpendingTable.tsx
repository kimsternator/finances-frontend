import {DataGrid} from '@mui/x-data-grid';
import type {Transaction} from '@Types';
import {columnConfig} from './spendingTableConfig';

type SpendingTableProps = {
	isExpenseDataLoading: boolean;
	transactions: Transaction[];
};

export const SpendingTable = ({transactions}: SpendingTableProps) => {
	return (
		<DataGrid
			rows={transactions}
			columns={columnConfig}
			disableRowSelectionOnClick
		/>
	);
};
