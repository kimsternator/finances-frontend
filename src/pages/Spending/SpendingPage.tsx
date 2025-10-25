import {Box, Card, styled} from '@mui/material';
import {SpendingTable} from './components';
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

const LayoutCard = styled(Card)(() => ({
	flex: 1,
}));

export const SpendingPage = () => {
	const {data, isError, isLoading} = useListTransactionsQuery({
		pageSize: 10,
		pageNumber: 1,
	});

	const transactions =
		!isLoading && !isError && data ? prepareExpenseData(data.transactions) : [];

	return (
		<SpendingPageLayout>
			{/* <LayoutCard>
				<SpendingGraphs expenseData={DUMMY_DATA} />
			</LayoutCard> */}
			<LayoutCard>
				<SpendingTable
					isExpenseDataLoading={isLoading}
					transactions={transactions}
				/>
			</LayoutCard>
		</SpendingPageLayout>
	);
};
