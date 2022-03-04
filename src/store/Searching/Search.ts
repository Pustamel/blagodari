import { createSlice } from '@reduxjs/toolkit'
import { initialStateType } from './typesSearch'
import { thunkSearchByName } from '../thunks'

const initialState: initialStateType = {
  searchedProfiles: [],
  isLoading: false,
}

export const SearchReducer = createSlice({
  name: 'searchReducer',
  initialState,
  reducers: {},
  extraReducers: {
    [thunkSearchByName.pending.type]: state => {
      state.isLoading = true
    },
    [thunkSearchByName.fulfilled.type]: (state, action) => {
      state.searchedProfiles = [...action.payload.users]
      state.isLoading = false
    },
    [thunkSearchByName.rejected.type]: state => {
      state.isLoading = true
    },
  },
})

// export const {  } = MainReducer.actions;
