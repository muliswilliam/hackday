import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coinsReducer from '@features/coins/coinsSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
