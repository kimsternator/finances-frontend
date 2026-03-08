import type {TransactionType} from '@Constants';
import type {
	PaginatedResponse,
	TagResponse,
	TokenResponse,
	TransactionResponse,
	UserResponse,
} from './apiResponses';
import type {PaginatedRequest} from './apiRequests';

// ---------- Auth Types ----------

export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = TokenResponse;

export type RegisterRequest = UserResponse;

export type RefreshTokenRequest = {
	refreshToken: string;
	username: string;
};

export type RefreshTokenResponse = TokenResponse;

export type GetUserRequest = {
	username: string;
};

export type GetUserResponse = UserResponse;

// ---------- Transaction Types ----------

export type CreateTransactionRequest = {
	name: string | null;
	description: string | null;
	amount: number;
	type: TransactionType;
	tagIds: string[];
	date: string;
};

export type CreateTransactionResponse = TransactionResponse;

export type CreateBatchTransactionRequest = {
	transactions: CreateTransactionRequest[];
};

export type CreateBatchTransactionResponse = CreateTransactionResponse[];

export type GetTransactionRequest = {
	id: string;
};

export type GetTransactionResponse = TransactionResponse;

export type UpdateTransactionRequest = CreateTransactionRequest & {
	id: string;
};

export type UpdateTransactionResponse = TransactionResponse;

export type DeleteTransactionRequest = {
	id: string;
};

export type DeleteTransactionResponse = {};

export type ListTransactionRequest = PaginatedRequest;

export type ListTransactionResponse = PaginatedResponse & {
	transactions: TransactionResponse[];
};

// ---------- Tag Types ----------

export type CreateTagRequest = {
	name: string | null;
	description: string | null;
	color: string | null;
};

export type ListTagsRequest = PaginatedRequest;

export type ListTagsResponse = PaginatedResponse & {
	tags: TagResponse[];
};
