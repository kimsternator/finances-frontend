import {Box, Card, styled} from '@mui/material';
import {TagTable} from './components';
import {TagTableHeader} from './components';
import {useListTagsQuery} from '~/api';

const TagPageLayout = styled(Box)(({theme}) => ({
	backgroundColor: 'skyblue',
	height: '100%',
	width: '100%',
	padding: theme.spacing(5),
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
}));

const LayoutCard = styled(Card)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	padding: theme.spacing(1, 2),
	gap: theme.spacing(2),
}));

export const TagPage = () => {
	const {data: listTagsResponse, isLoading: isListTagsLoading} =
		useListTagsQuery({
			pageSize: 10,
			pageNumber: 1,
		});

	const tags = listTagsResponse?.tags ?? [];

	return (
		<TagPageLayout>
			<LayoutCard>
				<TagTableHeader onRefetchTags={() => {}} />
				<TagTable isTagDataLoading={isListTagsLoading} tags={tags} />
			</LayoutCard>
		</TagPageLayout>
	);
};
