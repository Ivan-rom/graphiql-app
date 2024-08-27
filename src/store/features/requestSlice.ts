import { createSlice } from '@reduxjs/toolkit';
import { RequestData } from '@/helpers/types';
import { RequestMethods } from '@/helpers/enums';

const initialState: RequestData = {
  url: '',
  method: RequestMethods.GET,
  body: '',
  header: {},
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
      state.url = action.payload.url;
      state.method = action.payload.method;
      state.header = action.payload.header;
      state.body = action.payload.body;
    },
  },
});

export const { setURL, setMethod, setBody, setHeader, setRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
