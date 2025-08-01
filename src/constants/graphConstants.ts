import {GraphType} from '@Types';

export const DEFAULT_GRAPH_TYPE = GraphType.GAUGE;

export const SUPPORTED_GRAPH_TYPES = [
	GraphType.GAUGE,
	GraphType.BAR,
	GraphType.LINE,
	GraphType.PIE,
	GraphType.SCATTER,
	GraphType.RADAR,
];
