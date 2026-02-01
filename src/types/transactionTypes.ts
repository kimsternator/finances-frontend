import type {TagResponse} from './apiResponses';
import type {CreateTransactionRequest} from './apiTypes';

export type CreateTransactionTableItem = Omit<
	CreateTransactionRequest,
	'tagIds'
> & {
	id: string;
	tags: TagResponse[];
};
