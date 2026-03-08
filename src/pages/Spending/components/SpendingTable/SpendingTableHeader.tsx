import {Box, Button, styled, Typography} from '@mui/material';
import {useCreateBatchTransactionsMutation} from '@Api';
import {FloatLeftContainer, FloatRightContainer} from '@Components';
import {CreateTransactionModal} from '../CreateTransactionModal';
import {useState} from 'react';
import type {
	CreateBatchTransactionRequest,
	CreateBatchTransactionResponse,
} from '@Types';

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
	const [addNewTransactions] = useCreateBatchTransactionsMutation();

	const handleOpenCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const handleCloseCreateModal = (event: any, reason: string) => {
		if (reason === 'backdropClick') {
			return;
		}
		setIsCreateModalOpen(false);
	};

	const handleAddNewTransactions = (request: CreateBatchTransactionRequest) => {
		setIsCreateModalOpen(false);
		// TODO: send toast for in progress
		addNewTransactions(request)
			.unwrap()
			.then((response: CreateBatchTransactionResponse) => {
				onRefetchTransactions();
			})
			.catch((error) => {
				// TODO: send toast for error
				console.error('Error adding new transactions:', error);
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
				onAddNewTransactions={handleAddNewTransactions}
				onClose={handleCloseCreateModal}
				disableEscapeKeyDown
			/>
		</>
	);
};
