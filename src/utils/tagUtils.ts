import type {Tag, TagResponse} from '@Types';

export const mapTagResponseToTag = (response: TagResponse): Tag => {
	const tag = {
		...response,
	};
	return tag;
};
