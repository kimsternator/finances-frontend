import type {TransactionType} from '@Constants';
import type {Dayjs} from 'dayjs';

export type SpendingExpense = {
	id: string;
	name: string;
	type: string;
	amount: number;
	date: Date;
};

export type Tag = {
	id: string;
	name: string | null;
	description: string | null;
	color: string | null;
};

export type Transaction = {
	id: string;
	name: string | null;
	description: string | null;
	amount: number;
	type: TransactionType;
	tags: Tag[];
	date: Dayjs;
};
