import {Box, Button, styled, Typography} from '@mui/material';
import {useCreateTransactionMutation} from '@Api';
import {FloatLeftContainer, FloatRightContainer} from '@Components';
import {CreateTransactionModal} from '../CreateTransactionModal';
import {useState} from 'react';
import type {CreateTransactionRequest, CreateTransactionResponse} from '@Types';

const SpendingTableHeaderContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
}));

type SpendingTableHeaderProps = {
	onRefetchTransactions: () => void;
};

export const SpendingTableHeader = ({
	onRefetchTransactions,
}: SpendingTableHeaderProps) => {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [addNewTransaction] = useCreateTransactionMutation();

	const handleOpenCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const handleCloseCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	const handleAddNewTransaction = (request: CreateTransactionRequest) => {
		setIsCreateModalOpen(false);
		// TODO: send toast for in progress
		addNewTransaction(request)
			.unwrap()
			.then((response: CreateTransactionResponse) => {
				onRefetchTransactions();
			})
			.catch((error) => {
				// TODO: send toast for error
				console.error('Error adding new transaction:', error);
			});
	};

	return (
		<>
			<SpendingTableHeaderContainer>
				<FloatLeftContainer>
					<Typography variant="h5">Transactions</Typography>
				</FloatLeftContainer>
				<FloatRightContainer>
					<Button variant="contained" onClick={handleOpenCreateModal}>
						Add
					</Button>
				</FloatRightContainer>
			</SpendingTableHeaderContainer>
			<CreateTransactionModal
				open={isCreateModalOpen}
				onAddNewTransaction={handleAddNewTransaction}
				onClose={handleCloseCreateModal}
			/>
		</>
	);
};
