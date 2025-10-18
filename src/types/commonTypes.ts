export type RecursiveNullable<T> = {
	[K in keyof T]: T[K] | null;
};
