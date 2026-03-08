import type {
	CreateTransactionRequest,
	CreateTransactionTableItem,
	Transaction,
	TransactionResponse,
} from '@Types';
import {mapTagResponseToTag} from './tagUtils';
import dayjs from 'dayjs';
import {
	EMPTY_NEW_TRANSACTION_TABLE_ITEM,
	TRANSACTION_TYPE_LABELS,
} from '@Constants';
import type {TransactionType} from '@Constants';

export const mapTransactionResponseToTransaction = (
	response: TransactionResponse,
): Transaction => {
	const transaction = {
		...response,
		tags: response.tags.map((tag) => mapTagResponseToTag(tag)),
		date: dayjs(response.date),
	};
	return transaction;
};

export const prepareExpenseData = (
	responses: TransactionResponse[],
): Transaction[] => {
	const expenseData = responses.map((response) =>
		mapTransactionResponseToTransaction(response),
	);
	return expenseData;
};

export const getTransactionTypeLabel = (type: TransactionType): string => {
	return TRANSACTION_TYPE_LABELS[type];
};

export const getNewTransactionTableItem = (): CreateTransactionTableItem => {
	const newTransationTableItem = {
		...EMPTY_NEW_TRANSACTION_TABLE_ITEM,
		date: dayjs().toString(),
	};
	return newTransationTableItem;
};

export const mapTransactionTableItemToCreateTransactionRequest = (
	tableItem: CreateTransactionTableItem,
): CreateTransactionRequest => {
	const createTransactionRequest = {
		name: tableItem.name,
		description: tableItem.description,
		amount: Number(tableItem.amount),
		type: tableItem.type,
		date: dayjs(tableItem.date).toISOString(),
		tagIds: tableItem.tags.map((tag) => tag.id),
	};
	return createTransactionRequest;
};
