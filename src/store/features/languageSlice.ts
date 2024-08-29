import { createSlice } from '@reduxjs/toolkit';
import { locales } from '@/helpers/constants.ts';

const initialState = {
  locale: locales[0],
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

export const { setLocale } = languageSlice.actions;

export default languageSlice.reducer;
