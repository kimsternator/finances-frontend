import {GraphType} from '@Types';

export const formatGraphType = (graphType: GraphType): string => {
	const graphLabelMapping: Partial<Record<GraphType, string>> = {
		[GraphType.GAUGE]: 'Gauge',
		[GraphType.BAR]: 'Bar',
		[GraphType.LINE]: 'Line',
		[GraphType.PIE]: 'Pie',
		[GraphType.SCATTER]: 'Scatter',
		[GraphType.RADAR]: 'Radar',
	};

	return graphLabelMapping[graphType] ?? '';
};
