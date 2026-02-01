import {DataGrid} from '@mui/x-data-grid';
import type {TagResponse} from '@Types';
import {columnConfig} from './tagTableConfig';

type TagTableProps = {
	isTagDataLoading: boolean;
	tags: TagResponse[];
};

export const TagTable = ({tags, isTagDataLoading}: TagTableProps) => {
	return (
		<DataGrid
			rows={tags}
			columns={columnConfig}
			loading={isTagDataLoading}
			disableRowSelectionOnClick
		/>
	);
};
