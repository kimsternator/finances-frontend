import {useEffect, useRef, useState} from 'react';
import {Box, Button, Dialog, styled, Typography} from '@mui/material';
import type {DialogProps} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {FloatLeftContainer, FloatRightContainer} from '@Components';
import type {
	CreateTransactionRequest,
	CreateTransactionTableItem,
} from '@Types';
import {
	CREATE_TRANSACTION_TABLE_INITIAL_STATE,
	getCreateTransactionTableConfig,
} from './createTransactionTableConfig';
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import {EMPTY_NEW_TRANSACTION_TABLE_ITEM} from '@Constants';
import dayjs from 'dayjs';
import {getNewTransactionTableItem} from '@Utils';
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
}));

const CreateButtonContainer = styled(FloatRightContainer)(() => ({
	width: 'fit-content',
}));

type CreateTransactionModalProps = DialogProps & {
	onAddNewTransaction: (request: CreateTransactionRequest) => void;
};

export const CreateTransactionModal = ({
	onAddNewTransaction,
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
		console.log(createTransactionData);
		for (const transaction of createTransactionData) {
			const createTransactionRequest: CreateTransactionRequest = {
				name: transaction.name,
				description: transaction.description,
				amount: Number(transaction.amount),
				type: transaction.type,
				date: dayjs(transaction.date).toISOString(),
				tagIds: transaction.tags.map((tag) => tag.id),
			};
			onAddNewTransaction(createTransactionRequest);
		}
	};

	const columns = getCreateTransactionTableConfig({
		isTagOptionsLoading,
		tagOptions: tagOptions?.tags ?? [],
		onRemoveRow: handleRemoveRow,
	});

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
					<CreateButtonContainer>
						<Button variant="contained" onClick={handleCreateTransactions}>
							Create
						</Button>
					</CreateButtonContainer>
				</FooterContainer>
			</DialogContainer>
		</Dialog>
	);
};
