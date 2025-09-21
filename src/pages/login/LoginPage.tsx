import {Box, Card, styled} from '@mui/material';
import {LoginForm} from './components';

const LoginPageContainer = styled(Box)(({theme}) => ({
	display: 'flex',
	height: '100%',
	padding: theme.spacing(5),
	boxSizing: 'border-box',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const LoginPage = () => {
	return (
		<LoginPageContainer>
			<Card>
				<LoginForm />
			</Card>
		</LoginPageContainer>
	);
};
