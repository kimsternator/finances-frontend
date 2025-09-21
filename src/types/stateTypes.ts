import type {store} from '@State';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
