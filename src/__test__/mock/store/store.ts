import { combineReducers, configureStore } from '@reduxjs/toolkit';

import requestReducer from '@/store/features/requestSlice';

const rootReducer = combineReducers({
  request: requestReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
