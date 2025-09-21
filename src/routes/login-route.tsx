import type {MetaArgs} from 'react-router';
import {LoginPage} from '@Pages';

export const meta = ({}: MetaArgs) => {
	return [
		{title: 'Login'},
		{name: 'description', content: 'The login page for personal finances'},
	];
};

export const Login = () => {
	return <LoginPage />;
};

export default Login;
