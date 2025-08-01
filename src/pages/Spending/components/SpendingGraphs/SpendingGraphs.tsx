import {useState} from 'react';
import {Box, styled} from '@mui/material';
import {SpendingGraphsHeader} from './SpendingGraphsHeader';
import {GraphType, type SpendingExpense} from '@Types';
import {DEFAULT_GRAPH_TYPE} from '@Constants';
import {SpendingGraph} from './SpendingGraph';

const GraphsContainer = styled(Box)(({theme}) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
	boxSizing: 'border-box',
	padding: theme.spacing(2),
}));

type SpendingGraphsProps = {
	expenseData: SpendingExpense[];
};

export const SpendingGraphs = ({}: SpendingGraphsProps) => {
	const [selectedGraphType, setSeletedGraphType] =
		useState<GraphType>(DEFAULT_GRAPH_TYPE);
	return (
		<GraphsContainer>
			<SpendingGraphsHeader
				selectedGraphType={selectedGraphType}
				setSeletedGraphType={setSeletedGraphType}
			/>
			<SpendingGraph selectedGraphType={selectedGraphType} />
		</GraphsContainer>
	);
};
