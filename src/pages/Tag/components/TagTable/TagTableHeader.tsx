import {useState} from 'react';
import {Box, Typography, Button, styled} from '@mui/material';
import {FloatLeftContainer, FloatRightContainer} from '@Components';

const TagTableHeaderContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
}));

type TagTableHeaderProps = {
	onRefetchTags: () => void;
};

export const TagTableHeader = ({onRefetchTags}: TagTableHeaderProps) => {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	// const [addNewTransaction] = useCreateTransactionMutation();

	const handleOpenCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const handleCloseCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	return (
		<>
			<TagTableHeaderContainer>
				<FloatLeftContainer>
					<Typography variant="h5">Tags</Typography>
				</FloatLeftContainer>
				<FloatRightContainer>
					<Button variant="contained" onClick={handleOpenCreateModal}>
						Add
					</Button>
				</FloatRightContainer>
			</TagTableHeaderContainer>
			{/* <CreateTransactionModal
			open={isCreateModalOpen}
			onAddNewTransaction={handleAddNewTransaction}
			onClose={handleCloseCreateModal}
		/> */}
		</>
	);
};
