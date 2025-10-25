import {createApi} from '@reduxjs/toolkit/query/react';
import {getRetryableQuery} from '../query';
import {TRANSACTION_BASE_URL} from '@Constants';
import type {
	CreateTransactionRequest,
	CreateTransactionResponse,
	DeleteTransactionRequest,
	DeleteTransactionResponse,
	GetTransactionRequest,
	GetTransactionResponse,
	ListTransactionRequest,
	ListTransactionResponse,
	RootState,
	UpdateTransactionRequest,
	UpdateTransactionResponse,
} from '@Types';
import {selectAccessToken} from '@State';
import {setAuthorizationHeader} from '@Utils';

export const transactionService = createApi({
	reducerPath: 'transactionService',
	baseQuery: getRetryableQuery({
		baseUrl: TRANSACTION_BASE_URL,
		prepareHeaders: (headers, {getState}) => {
			const state = getState() as RootState;
			const accessToken = selectAccessToken(state);
			setAuthorizationHeader(headers, accessToken);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		createTransaction: builder.mutation<
			CreateTransactionResponse,
			CreateTransactionRequest
		>({
			query: (request) => ({
				url: '/create',
				method: 'POST',
				body: request,
			}),
		}),
		getTransaction: builder.query<
			GetTransactionResponse,
			GetTransactionRequest
		>({
			query: ({id}) => ({
				url: `/${id}`,
				method: 'GET',
			}),
		}),
		updateTransaction: builder.mutation<
			UpdateTransactionResponse,
			UpdateTransactionRequest
		>({
			query: ({id, ...request}) => ({
				url: `/${id}`,
				method: 'PUT',
				body: request,
			}),
		}),
		deleteTransaction: builder.mutation<
			DeleteTransactionResponse,
			DeleteTransactionRequest
		>({
			query: ({id}) => ({
				url: `/${id}`,
				method: 'DELETE',
			}),
		}),
		listTransactions: builder.query<
			ListTransactionResponse,
			ListTransactionRequest
		>({
			query: ({pageSize, pageNumber}) => ({
				url: `/list?pageSize=${pageSize}&pageNumber=${pageNumber}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useCreateTransactionMutation,
	useGetTransactionQuery,
	useUpdateTransactionMutation,
	useDeleteTransactionMutation,
	useListTransactionsQuery,
} = transactionService;
