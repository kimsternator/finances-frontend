import {DataGrid} from '@mui/x-data-grid';
import type {SpendingExpense} from '@Types';
import {columnConfig} from './spendingTableConfig';

type SpendingTableProps = {
	isExpenseDataLoading: boolean;
	expenseData: SpendingExpense[];
};

export const SpendingTable = ({expenseData}: SpendingTableProps) => {
	return (
		<DataGrid
			rows={expenseData}
			columns={columnConfig}
			disableRowSelectionOnClick
		/>
	);
};
