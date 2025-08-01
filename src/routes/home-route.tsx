import type {MetaArgs} from 'react-router';

export const meta = ({}: MetaArgs) => {
	return [
		{title: 'Finances'},
		{name: 'description', content: 'The landing page for personal finances'},
	];
};

export const Home = () => {
	return <div>Hi home</div>;
};

export default Home;
