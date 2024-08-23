import { createSlice } from '@reduxjs/toolkit';
import { RequestData } from '../../helpers/types';
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
      return {...state, url: action.payload};
    },
    setMethod(state, action) {
      return {...state, method: action.payload };
    },
    setBody(state, action) {
      return {...state, body: action.payload};
    },
    setHeader(state, action) {
      return {...state, header: action.payload };
    },
  },
});

export const { setURL, setMethod, setBody, setHeader } =
  requestSlice.actions;
export default requestSlice.reducer;
