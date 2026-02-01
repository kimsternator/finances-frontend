import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type CreateTransactionTableActionsProps = {
	rowId: string;
	onRemoveRow: (rowId: string) => void;
};

export const CreateTransactionTableActions = ({
	rowId,
	onRemoveRow,
}: CreateTransactionTableActionsProps) => {
	const handleRemoveRow = () => {
		onRemoveRow(rowId);
	};

	return (
		<IconButton onClick={handleRemoveRow}>
			<DeleteIcon />
		</IconButton>
	);
};
