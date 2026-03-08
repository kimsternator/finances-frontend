import {useEffect, useRef, useState} from 'react';
import {Box, Button, Dialog, styled, Typography} from '@mui/material';
import type {DialogProps} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {FloatLeftContainer, FloatRightContainer} from '@Components';
import type {
	CreateBatchTransactionRequest,
	CreateTransactionTableItem,
} from '@Types';
import {
	CREATE_TRANSACTION_TABLE_INITIAL_STATE,
	getCreateTransactionTableConfig,
} from './createTransactionTableConfig';
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import {EMPTY_NEW_TRANSACTION_TABLE_ITEM} from '@Constants';
import dayjs from 'dayjs';
import {
	getNewTransactionTableItem,
	mapTransactionTableItemToCreateTransactionRequest,
} from '@Utils';
import {useListTagsQuery} from '@Api';

const DialogContainer = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: theme.spacing(2),
	gap: theme.spacing(2),
	overflow: 'hidden',
}));

const HeaderContainer = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'row',
}));

const ContentContainer = styled(Box)(() => ({
	flex: 1,
	minHeight: 0,
}));

const FooterContainer = styled(Box)(() => ({
	marginTop: 'auto',
	width: '100%',
}));

const FooterButtonsContainer = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'row',
	gap: theme.spacing(1),
	justifyContent: 'flex-end',
}));

type CreateTransactionModalProps = DialogProps & {
	onAddNewTransactions: (request: CreateBatchTransactionRequest) => void;
};

export const CreateTransactionModal = ({
	onAddNewTransactions,
	...dialogProps
}: CreateTransactionModalProps) => {
	const rowId = useRef<number>(1);
	const apiRef = useGridApiRef();
	const [createTransactionData, setCreateTransactionData] = useState<
		CreateTransactionTableItem[]
	>([getNewTransactionTableItem()]);
	const {data: tagOptions, isLoading: isTagOptionsLoading} = useListTagsQuery({
		pageSize: 25,
		pageNumber: 1,
	});

	const handleAddNewTransactionToTable = () => {
		const newCreateTransactionDataItem = {
			...EMPTY_NEW_TRANSACTION_TABLE_ITEM,
			id: String(rowId.current++),
			date: dayjs().toString(),
		};
		const newCreateTransactionData = [
			...createTransactionData,
			newCreateTransactionDataItem,
		];
		setCreateTransactionData(newCreateTransactionData);

		// Focus the name cell in edit mode for the newly added row
		setTimeout(() => {
			apiRef.current?.startCellEditMode({
				id: newCreateTransactionDataItem.id,
				field: 'name',
			});
		}, 0);
	};

	const handleProcessRowUpdate = (
		updatedTransactionData: CreateTransactionTableItem,
	) => {
		setCreateTransactionData((oldTransactionData) =>
			oldTransactionData.map((transactionData) =>
				transactionData.id === updatedTransactionData.id
					? updatedTransactionData
					: transactionData,
			),
		);
		return updatedTransactionData;
	};

	const handleRemoveRow = (rowId: string) => {
		const newCreateTransactionData = structuredClone(
			createTransactionData,
		).filter((transactionData) => transactionData.id !== rowId);
		setCreateTransactionData(newCreateTransactionData);
	};

	const handleCreateTransactions = () => {
		const createTransactionRequestData = createTransactionData.map(
			(transaction) =>
				mapTransactionTableItemToCreateTransactionRequest(transaction),
		);
		const createBatchTransactionRequest = {
			transactions: createTransactionRequestData,
		};
		onAddNewTransactions(createBatchTransactionRequest);
		setCreateTransactionData([getNewTransactionTableItem()]);
	};

	const columns = getCreateTransactionTableConfig({
		isTagOptionsLoading,
		tagOptions: tagOptions?.tags ?? [],
		onRemoveRow: handleRemoveRow,
	});

	const {onClose} = dialogProps;

	const handleCancel = () => {
		setCreateTransactionData([getNewTransactionTableItem()]);
		onClose?.({}, '' as 'backdropClick');
	};

	return (
		<Dialog {...dialogProps} maxWidth="lg" fullWidth>
			<DialogContainer>
				<HeaderContainer>
					<FloatLeftContainer>
						<Typography variant="h5">Add New Transactions</Typography>
					</FloatLeftContainer>
					<FloatRightContainer>
						<Button
							variant="contained"
							onClick={handleAddNewTransactionToTable}
							startIcon={<AddIcon />}
						>
							Add
						</Button>
					</FloatRightContainer>
				</HeaderContainer>
				<ContentContainer>
					<DataGrid
						apiRef={apiRef}
						rows={createTransactionData}
						columns={columns}
						initialState={CREATE_TRANSACTION_TABLE_INITIAL_STATE}
						getRowHeight={() => 'auto'}
						processRowUpdate={handleProcessRowUpdate}
						sx={{height: '100%'}}
						disableColumnMenu
						disableColumnSelector
						disableColumnFilter
						disableRowSelectionOnClick
					/>
				</ContentContainer>
				<FooterContainer>
					<FooterButtonsContainer>
						<Button variant="outlined" onClick={handleCancel}>
							Cancel
						</Button>
						<Button variant="contained" onClick={handleCreateTransactions}>
							Create
						</Button>
					</FooterButtonsContainer>
				</FooterContainer>
			</DialogContainer>
		</Dialog>
	);
};
