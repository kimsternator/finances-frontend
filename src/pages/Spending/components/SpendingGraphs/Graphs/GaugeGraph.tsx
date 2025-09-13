import {Gauge, gaugeClasses} from '@mui/x-charts/Gauge';

export const GaugeGraph = () => {
	return (
		<Gauge
			value={75}
			startAngle={-110}
			endAngle={110}
			sx={(theme) => ({
				[`& .${gaugeClasses.valueText}`]: {
					fontSize: 80,
				},
			})}
		/>
	);
};
