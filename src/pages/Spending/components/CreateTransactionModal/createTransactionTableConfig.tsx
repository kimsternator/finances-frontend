import type {ChangeEvent} from 'react';
import {
	Autocomplete,
	Box,
	Checkbox,
	Chip,
	FormControl,
	MenuItem,
	Select,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import type {
	GridCellParams,
	GridColDef,
	GridRenderCellParams,
	GridSortDirection,
} from '@mui/x-data-grid';
import {CreateTransactionTableActions} from './CreateTransactionTableActions';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import type {PickerValue} from '@mui/x-date-pickers/internals';
import dayjs from 'dayjs';
import {TRANSACTION_TYPE_OPTIONS, TransactionType} from '@Constants';
import {getTransactionTypeLabel} from '@Utils';
import type {TagResponse} from '@Types';

const CellContainer = styled(Box)(({theme}) => ({
	padding: theme.spacing(1),
}));

const CellTextField = styled(TextField)(({theme}) => ({
	padding: theme.spacing(1),
}));

type GetCreateTransactionTableConfigProps = {
	isTagOptionsLoading: boolean;
	tagOptions: TagResponse[];
	onRemoveRow: (rowId: string) => void;
};

export const getCreateTransactionTableConfig = ({
	isTagOptionsLoading,
	tagOptions,
	onRemoveRow,
}: GetCreateTransactionTableConfigProps): GridColDef[] => [
	{
		field: 'name',
		headerName: 'Name',
		sortable: true,
		resizable: false,
		editable: true,
		display: 'flex',
		flex: 1,
		renderEditCell: (params: GridCellParams) => {
			return (
				<CellTextField
					size="small"
					defaultValue={params.value}
					onChange={(e) => {
						params.api.setEditCellValue(
							{id: params.id, field: params.field, value: e.target.value},
							e,
						);
					}}
					onFocus={(e) => e.target.select()}
					autoFocus
					fullWidth
				/>
			);
		},
	},
	{
		field: 'description',
		headerName: 'Description',
		sortable: true,
		resizable: false,
		editable: true,
		display: 'flex',
		flex: 1,
		renderEditCell: (params: GridCellParams) => {
			return (
				<CellTextField
					size="small"
					defaultValue={params.value}
					onChange={(e) => {
						params.api.setEditCellValue(
							{id: params.id, field: params.field, value: e.target.value},
							e,
						);
					}}
					onFocus={(e) => e.target.select()}
					autoFocus
					fullWidth
				/>
			);
		},
	},
	{
		field: 'amount',
		headerName: 'Amount',
		sortable: true,
		resizable: false,
		editable: true,
		display: 'flex',
		flex: 1,
		valueFormatter: (value: number) => {
			if (!isFinite(value) || isNaN(value)) {
				return '$0.00';
			}
			const sign = value < 0 ? '-' : '';
			const abs = Math.abs(value).toFixed(2);
			return `${sign}$${abs}`;
		},
		valueParser: (newValue: string) => {
			// strip anything except digits, dot and minus
			const cleanedValue = String(newValue ?? '').replace(/[^\d.-]/g, '');
			const value = Number(cleanedValue);
			if (!isFinite(value) || isNaN(value)) {
				return 0;
			}
			return value;
		},
		renderEditCell: (params: GridCellParams) => {
			const raw = params.value;
			const num = Number(raw);
			const isNegative = isFinite(num) && num < 0;
			const absValue = isFinite(num) ? Math.abs(num) : 0;
			return (
				<CellTextField
					size="small"
					fullWidth
					// show the numeric portion (without $ / -) while editing
					defaultValue={String(absValue)}
					onChange={(e) => {
						// set the edit cell value so DataGrid knows about intermediate changes
						// include minus sign if currently negative
						const typed = e.target.value;
						const valueToCommit = (isNegative ? '-' : '') + typed;
						// @ts-ignore - setEditCellValue exists on the api in runtime
						params.api.setEditCellValue(
							{id: params.id, field: params.field, value: valueToCommit},
							e,
						);
					}}
					onFocus={(e) => e.target.select()}
					autoFocus
				/>
			);
		},
	},
	{
		field: 'type',
		headerName: 'Type',
		sortable: true,
		resizable: false,
		editable: true,
		display: 'flex',
		flex: 1,
		valueFormatter: (type: TransactionType) => {
			const formattedValue = getTransactionTypeLabel(type);
			return formattedValue;
		},
		renderEditCell: (params: GridCellParams) => (
			<FormControl size="small" fullWidth>
				<Select
					value={params.row.type}
					renderValue={(value) => getTransactionTypeLabel(value)}
					onChange={(e) => {
						const newType = e.target.value;
						params.api.setEditCellValue(
							{id: params.id, field: params.field, value: newType},
							e,
						);
						params.api.stopCellEditMode({id: params.id, field: params.field});
					}}
					fullWidth
				>
					{TRANSACTION_TYPE_OPTIONS.map((transactionType) => (
						<MenuItem value={transactionType}>
							{getTransactionTypeLabel(transactionType)}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		),
	},
	{
		field: 'tags',
		headerName: 'Tags',
		sortable: true,
		resizable: false,
		editable: true,
		display: 'flex',
		flex: 1,
		renderCell: (params: GridRenderCellParams<any, TagResponse[]>) => {
			const tags = params.value ?? [];
			return (
				<CellContainer>
					{tags.map((tag: TagResponse) => (
						<Chip key={tag.id} label={tag.name} />
					))}
				</CellContainer>
			);
		},
		renderEditCell: ({row: {tags}, ...params}: GridCellParams) => {
			const filteredTagOptions = tagOptions.filter(
				(tagOptions) => !tags.includes(tagOptions.id),
			);
			return (
				<Autocomplete
					loading={isTagOptionsLoading}
					options={filteredTagOptions}
					size="small"
					value={tags}
					getOptionLabel={(tagOption) => tagOption.name}
					renderInput={(params) => <TextField {...params} label="Tags" />}
					renderOption={(props, tag, {selected}) => {
						const {key, ...restProps} = props;
						return (
							<MenuItem key={key} {...restProps} value={tag.id}>
								<Checkbox checked={selected} />
								<Typography>{tag.name}</Typography>
							</MenuItem>
						);
					}}
					onChange={(e, newTags) => {
						params.api.setEditCellValue(
							{id: params.id, field: params.field, value: newTags},
							e,
						);
					}}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					disableCloseOnSelect
					multiple
					fullWidth
					openOnFocus
				/>
			);
		},
	},
	{
		field: 'date',
		headerName: 'Date',
		sortable: true,
		resizable: false,
		editable: true,
		display: 'flex',
		flex: 1,
		valueFormatter: (rawValue: string) => {
			const value = dayjs(rawValue);
			const now = dayjs();
			if (value.diff(now, 'day') === 0) {
				return 'Today';
			}
			if (value.year() === now.year()) {
				return dayjs(value).format('MMMM DD');
			}
			return dayjs(value).format('MMMM DD YYYY');
		},
		renderEditCell: (params: GridCellParams) => (
			<DatePicker
				label="Date"
				defaultValue={dayjs(params.row.date)}
				onChange={(newDate: PickerValue) => {
					const dayJsValue = dayjs(newDate);
					params.api.setEditCellValue({
						id: params.id,
						field: params.field,
						value: dayJsValue.toString(),
					});
				}}
				slotProps={{textField: {size: 'small', required: true}}}
			/>
		),
	},
	{
		field: 'actions',
		headerName: '',
		sortable: false,
		resizable: false,
		disableColumnMenu: true,
		renderCell: (params: GridCellParams) => (
			<CellContainer>
				<CreateTransactionTableActions
					rowId={params.row.id}
					onRemoveRow={onRemoveRow}
				/>
			</CellContainer>
		),
		align: 'center',
	},
];

export const CREATE_TRANSACTION_TABLE_INITIAL_STATE = {
	sorting: {
		sortModel: [{field: 'date', sort: 'desc' as GridSortDirection}],
	},
};
