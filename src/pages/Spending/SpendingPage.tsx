import {Box, Card, styled} from '@mui/material';
import {SpendingTable} from './components';
import {SpendingGraphs} from './components/SpendingGraphs';

const DUMMY_DATA = [
	{
		id: '1',
		name: 'transation1',
		type: 'type1',
		amount: 100,
		date: new Date(Date.now()),
	},
	{
		id: '2',
		name: 'transation2',
		type: 'type2',
		amount: 2100,
		date: new Date(Date.now() - 24 * 60 * 60 * 1000),
	},
	{
		id: '3',
		name: 'transation3',
		type: 'type3',
		amount: -500,
		date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
	},
];

const SpendingPageLayout = styled(Box)(({theme}) => ({
	backgroundColor: 'skyblue',
	height: '100%',
	padding: theme.spacing(5),
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
}));

const LayoutCard = styled(Card)(() => ({
	flex: 1,
}));

export const SpendingPage = () => {
	return (
		<SpendingPageLayout>
			<LayoutCard>
				<SpendingGraphs expenseData={DUMMY_DATA} />
			</LayoutCard>
			<LayoutCard>
				<SpendingTable isExpenseDataLoading={false} expenseData={DUMMY_DATA} />
			</LayoutCard>
		</SpendingPageLayout>
	);
};
