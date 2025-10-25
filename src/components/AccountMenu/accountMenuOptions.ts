import type {AccountMenuOption} from '@Types';

type GetAccountMenuOptionsProps = {
	onLogOut: () => void;
};

export const getAccountMenuOptions = ({
	onLogOut,
}: GetAccountMenuOptionsProps): AccountMenuOption[] => [
	{
		id: '0',
		label: 'Account Information',
		disabled: true,
	},
	{
		id: '1',
		label: 'Settings',
		disabled: true,
	},
	{
		id: '2',
		label: 'Log out',
		onClick: onLogOut,
	},
];
