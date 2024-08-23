import { configureStore } from '@reduxjs/toolkit';
import requestReducer from './features/requestSlice';

export const store = configureStore({
  reducer: {
    request: requestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
