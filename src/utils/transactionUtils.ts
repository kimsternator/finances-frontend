import type {Transaction, TransactionResponse} from '@Types';
import {mapTagResponseToTag} from './tagUtils';
import dayjs from 'dayjs';

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
