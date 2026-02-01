import {Box, Card, styled} from '@mui/material';
import {SpendingTable, SpendingTableHeader} from './components';
import {SpendingGraphs} from './components/SpendingGraphs';
import {useListTransactionsQuery} from '~/api/transaction/transactionService';
import {prepareExpenseData} from '@Utils';

const SpendingPageLayout = styled(Box)(({theme}) => ({
	backgroundColor: 'skyblue',
	height: '100%',
	width: '100%',
	padding: theme.spacing(5),
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
}));

const LayoutCard = styled(Card)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	padding: theme.spacing(1, 2),
	gap: theme.spacing(2),
}));

export const SpendingPage = () => {
	const {
		data,
		isError: isTransactionsError,
		isLoading: isTransactionsLoading,
		refetch: refetchTransactions,
	} = useListTransactionsQuery({
		pageSize: 10,
		pageNumber: 1,
	});

	const transactions =
		!isTransactionsLoading && !isTransactionsError && data
			? prepareExpenseData(data.transactions)
			: [];

	return (
		<SpendingPageLayout>
			{/* <LayoutCard>
				<SpendingGraphs expenseData={DUMMY_DATA} />
			</LayoutCard> */}
			<LayoutCard>
				<SpendingTableHeader onRefetchTransactions={refetchTransactions} />
				<SpendingTable
					isExpenseDataLoading={isTransactionsLoading}
					transactions={transactions}
				/>
			</LayoutCard>
		</SpendingPageLayout>
	);
};
