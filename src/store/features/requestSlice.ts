import { createSlice } from '@reduxjs/toolkit';
import { HeadersRequest, RequestData, RequestMethods } from './types';

const initialState: RequestData = {
  url: '',
  method: RequestMethods.GET,
  body: '',
  header: {} as HeadersRequest,
};

export const requestSlice = createSlice({
  name: 'request',
  initialState: initialState,
  reducers: {
    setURL(state, action) {
      state.url = action.payload;
    },
    setMethod(state, action) {
      state.method = action.payload;
    },
    setBody(state, action) {
      state.body = action.payload;
    },
    setHeader(state, action) {
      state.header = action.payload;
    },
    setRequest(state, action) {
      state = action.payload;
    },
  },
});

export const { setURL, setMethod, setBody, setHeader, setRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
