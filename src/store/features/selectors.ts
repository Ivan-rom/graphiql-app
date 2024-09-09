import { RootState } from '../store';

export const selectURL = (state: RootState) => state.request.url;
export const selectMethod = (state: RootState) => state.request.method;
export const selectBody = (state: RootState) => state.request.body;
export const selectHeaders = (state: RootState) => state.request.headers;
export const selectRequest = (state: RootState) => state.request;
