import dayjs from 'dayjs';
import type {CreateTransactionTableItem} from '@Types';

export enum TransactionType {
	INCOME,
	EXPENSE,
}

export const TRANSACTION_TYPE_OPTIONS = [
	TransactionType.INCOME,
	TransactionType.EXPENSE,
];

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
	[TransactionType.INCOME]: 'Income',
	[TransactionType.EXPENSE]: 'Expense',
};

export const EMPTY_NEW_TRANSACTION_TABLE_ITEM: Omit<
	CreateTransactionTableItem,
	'date'
> = {
	id: '0',
	name: 'Transaction',
	description: 'Transaction description',
	amount: 0,
	type: TransactionType.EXPENSE,
	tags: [],
};
