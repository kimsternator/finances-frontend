import type {MetaArgs} from 'react-router';
import {TagPage} from '@Pages';

export const meta = ({}: MetaArgs) => {
	return [{title: 'Tags'}, {name: 'description', content: 'The page for tags'}];
};

export const Tag = () => {
	return <TagPage />;
};

export default Tag;
