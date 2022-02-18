import { initialStateType, payloadProfile } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkGetProfile } from './thunks';

const initialState: initialStateType = {
  profile: {
    photo: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    gender: 'женщина',
    ability: '',
    mother: 'Елена',
    father: 'Сергей',
    dob: '12.12.2000',
    dod: '',
    location: { latitude: '', longitude: '' },
  },
  loading: false,
};

export const MainReducer = createSlice({
  name: 'test',
  initialState,
  reducers: {
    //for simple action
    getProfile: state => {
      //example
      return state;
    },
  },
  extraReducers: {
    //for thunk!
    [thunkGetProfile.fulfilled.type]: (
      state,
      action: PayloadAction<payloadProfile>,
    ) => {
      state.profile = action.payload;
    },
    [thunkGetProfile.pending.type]: state => {
      //example for in process
      state.loading = true;
    },
    [thunkGetProfile.rejected.type]: state => {
      // example for error
      state.loading = false;
    },
  },
});

// current(state) - for see state

export const testFnction = () => {
  //example simple action
  MainReducer.actions.getProfile();
};
testFnction();

export const { getProfile } = MainReducer.actions;
