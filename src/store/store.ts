import { configureStore } from '@reduxjs/toolkit';
import requestReducer from './features/requestSlice';
import languageReducer from './features/languageSlice';

export const store = configureStore({
  reducer: {
    request: requestReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
