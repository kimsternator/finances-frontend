import {Box, styled} from '@mui/material';
import type {GraphType} from '@Types';
import {KPI} from './Graphs';

const GraphContainer = styled(Box)(() => ({}));

type SpendingGraphProps = {
	selectedGraphType: GraphType;
};

export const SpendingGraph = ({selectedGraphType}: SpendingGraphProps) => {
	return (
		<GraphContainer>
			<KPI />
		</GraphContainer>
	);
};
