import { createSlice } from '@reduxjs/toolkit';
import { initialStateType } from './typesSearch';

const initialState: initialStateType = {
  searchedProfiles: [],
};

export const SearchReducer = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {},
  extraReducers: {},
});

// export const {  } = MainReducer.actions;
