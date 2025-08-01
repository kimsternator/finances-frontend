import {
	Box,
	FormControl,
	MenuItem,
	Select,
	styled,
	Typography,
} from '@mui/material';
import type {SelectChangeEvent} from '@mui/material';
import {SUPPORTED_GRAPH_TYPES} from '@Constants';
import {formatGraphType} from '@Utils';
import type {GraphType} from '@Types';

const GraphTitle = styled(Box)(({theme}) => ({
	margin: theme.spacing(1),
}));

const GraphSelector = styled(Box)(() => ({
	marginLeft: 'auto',
}));

const HeaderContainer = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
}));

type SpendingGraphsHeaderProps = {
	selectedGraphType: GraphType;
	setSeletedGraphType: (graphType: GraphType) => void;
};

export const SpendingGraphsHeader = ({
	selectedGraphType,
	setSeletedGraphType,
}: SpendingGraphsHeaderProps) => {
	const handleGraphTypeChange = (event: SelectChangeEvent<GraphType>) => {
		setSeletedGraphType(event.target.value as GraphType);
	};

	return (
		<HeaderContainer>
			<GraphTitle>
				<Typography variant="h5">Temp Graph Header</Typography>
			</GraphTitle>
			<GraphSelector>
				<FormControl size="small">
					<Select value={selectedGraphType} onChange={handleGraphTypeChange}>
						{SUPPORTED_GRAPH_TYPES.map((graphType) => (
							<MenuItem key={graphType} value={graphType}>
								{formatGraphType(graphType)}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</GraphSelector>
		</HeaderContainer>
	);
};
