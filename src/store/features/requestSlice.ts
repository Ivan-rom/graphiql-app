import { createSlice } from '@reduxjs/toolkit';
import { IVariable, RequestData, VariableKeys } from '@/helpers/types';
import { RequestMethods } from '@/helpers/enums';
import { DEFAULT_VARIABLE } from '@/helpers/constants';

export const initialState: RequestData = {
  url: '',
  method: RequestMethods.GET,
  body: '',
  headers: [{ ...DEFAULT_VARIABLE }],
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
    setHeaders(state, action: { payload: IVariable[] }) {
      state.headers = [...action.payload];
    },
    addHeader(state) {
      const newId = state.headers[state.headers.length - 1].id + 1;
      state.headers.push({ key: '', value: '', id: newId });
    },
    updateHeader(state, { payload }: { payload: { name: VariableKeys; value: string; index: number } }) {
      state.headers[payload.index][payload.name] = payload.value;
    },
    setRequest(state, action) {
      state.url = action.payload.url;
      state.method = action.payload.method;
      state.headers = action.payload.headers;
      state.body = action.payload.body;
    },
  },
});

export const { setURL, setMethod, setBody, setHeaders, addHeader, updateHeader, setRequest } = requestSlice.actions;
export default requestSlice.reducer;
