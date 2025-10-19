import {useState} from 'react';
import type {ChangeEvent, MouseEvent} from 'react';
import {useNavigate} from 'react-router';
import {
	Alert,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import type {BoxProps} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {authService, useLoginMutation} from '@Api';
import type {LoginData} from '@Types';
import {isValidLoginData, setAuthDataInStorage} from '@Utils';
import {Routes} from '@Constants';
import {useTypedDispatch} from '@State';

const LoginFormContainer = styled(Box)<BoxProps>(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	boxSizing: 'border-box',
	padding: theme.spacing(3),
	alignItems: 'flex-start',
	gap: theme.spacing(1),
}));

const LoginFormInputs = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
	alignItems: 'flex-start',
}));

const LoginFormTextField = styled(TextField)(({theme}) => ({
	width: '100%',
}));

const LoginFormSubmitButton = styled(Button)(({theme}) => ({
	width: '100%',
}));

const LoginErrorAlert = styled(Alert)(({theme}) => ({
	width: '100%',
	maxWidth: '100%',
	overflowWrap: 'break-word',
	boxSizing: 'border-box',
	wordBreak: 'break-word',
}));

export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loginData, setLoginData] = useState<LoginData>({
		username: '',
		password: '',
		rememberMe: false,
	});
	const [login, {isLoading: isLoginLoading, isError: isLoginError}] =
		useLoginMutation();
	const navigate = useNavigate();
	const {username, password, rememberMe} = loginData;
	const dispatch = useTypedDispatch();

	const handleTextFieldChange = (
		event: ChangeEvent<{name: string; value: string}>,
	) => {
		const newFormData = {...loginData, [event.target.name]: event.target.value};
		setLoginData(newFormData);
	};

	const handleCheckboxChange = (
		event: ChangeEvent<{name: string; checked: boolean}>,
	) => {
		const newFormData = {
			...loginData,
			[event.target.name]: event.target.checked,
		};
		setLoginData(newFormData);
	};

	const handleToggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleLoginSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const {rememberMe, ...loginRequest} = loginData;
		const {username} = loginData;
		const {data, error} = await login(loginRequest);
		if (error) {
			return;
		}
		setAuthDataInStorage({...data, username, rememberMe});
		await dispatch(authService.endpoints.getCurrentUser.initiate({username}));
		navigate(Routes.HOME);
	};

	const isSubmitDisabled = !isValidLoginData(loginData) || isLoginLoading;

	return (
		<LoginFormContainer>
			<Typography variant="h4">Login</Typography>
			{isLoginError && (
				<LoginErrorAlert severity="error">
					Invalid username or password
				</LoginErrorAlert>
			)}
			<LoginFormInputs>
				<LoginFormTextField
					name="username"
					label="Username"
					variant="standard"
					onChange={handleTextFieldChange}
					value={username}
					required
				/>
				<LoginFormTextField
					name="password"
					label="Password"
					variant="standard"
					type={showPassword ? 'text' : 'password'}
					onChange={handleTextFieldChange}
					value={password}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label={
											showPassword ? 'Hide password' : 'Show password'
										}
										onClick={handleToggleShowPassword}
									>
										{showPassword && <VisibilityOffIcon />}
										{!showPassword && <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							),
						},
					}}
					required
				/>
			</LoginFormInputs>
			<FormControlLabel
				control={
					<Checkbox
						name="rememberMe"
						onChange={handleCheckboxChange}
						checked={rememberMe}
					/>
				}
				label="Remember me"
			/>
			<LoginFormSubmitButton
				variant="contained"
				onClick={handleLoginSubmit}
				disabled={isSubmitDisabled}
			>
				<Typography>Submit</Typography>
			</LoginFormSubmitButton>
		</LoginFormContainer>
	);
};
