import { configureStore } from '@reduxjs/toolkit';
import { MainReducer } from './state';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction } from './commonTypes';

export const store = configureStore({
  reducer: {
    MainReducer: MainReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
