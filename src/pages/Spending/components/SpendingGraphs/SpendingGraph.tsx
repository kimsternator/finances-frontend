import {Box, styled} from '@mui/material';
import type {GraphType} from '@Types';
import {GaugeGraph} from './Graphs/GaugeGraph';

const GraphContainer = styled(Box)(() => ({
	flex: 1,
}));

type SpendingGraphProps = {
	selectedGraphType: GraphType;
};

export const SpendingGraph = ({selectedGraphType}: SpendingGraphProps) => {
	return (
		<GraphContainer>
			<GaugeGraph />
		</GraphContainer>
	);
};
