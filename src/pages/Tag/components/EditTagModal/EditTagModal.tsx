// import {Box, styled} from '@mui/material';
// import type {DialogProps} from '@mui/material';
// import type {CreateTagRequest} from '@Types';

// const DialogContainer = styled(Box)(({theme}) => ({
// 	display: 'flex',
// 	flexDirection: 'column',
// 	padding: theme.spacing(2),
// 	gap: theme.spacing(2),
// 	overflow: 'hidden',
// }));

// type EditTagModalProps = DialogProps & {
// 	onEditTag: (request: CreateTagRequest) => void;
// };

// export const EditTagModal = ({onEditTag}: EditTagModalProps) => {
// 	return (
// 		<Dialog {...dialogProps} maxWidth="lg" fullWidth>
// 			<DialogContainer>
// 				<HeaderContainer>
// 					<FloatLeftContainer>
// 						<Typography variant="h5">Add New Transactions</Typography>
// 					</FloatLeftContainer>
// 					<FloatRightContainer>
// 						<Button
// 							variant="contained"
// 							onClick={handleAddNewTransactionToTable}
// 							startIcon={<AddIcon />}
// 						>
// 							Add
// 						</Button>
// 					</FloatRightContainer>
// 				</HeaderContainer>
// 				<ContentContainer>
// 					<DataGrid
// 						apiRef={apiRef}
// 						rows={createTransactionData}
// 						columns={columns}
// 						initialState={CREATE_TRANSACTION_TABLE_INITIAL_STATE}
// 						getRowHeight={() => 'auto'}
// 						processRowUpdate={handleProcessRowUpdate}
// 						sx={{height: '100%'}}
// 						disableColumnMenu
// 						disableColumnSelector
// 						disableColumnFilter
// 						disableRowSelectionOnClick
// 					/>
// 				</ContentContainer>
// 				<FooterContainer>
// 					<CreateButtonContainer>
// 						<Button variant="contained" onClick={handleCreateTransactions}>
// 							Create
// 						</Button>
// 					</CreateButtonContainer>
// 				</FooterContainer>
// 			</DialogContainer>
// 		</Dialog>
// 	);
// };
