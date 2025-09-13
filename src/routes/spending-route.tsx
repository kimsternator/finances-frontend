import type {MetaArgs} from 'react-router';
import {SpendingPage} from '@Pages';

export const meta = ({}: MetaArgs) => {
	return [
		{title: 'Spending'},
		{name: 'description', content: 'The page for spending'},
	];
};

export const Spending = () => {
	return <SpendingPage />;
};

export default Spending;
