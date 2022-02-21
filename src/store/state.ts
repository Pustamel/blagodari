import { initialStateType, profileData } from './typesProfile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkGetProfile } from './thunks';

const initialState: initialStateType = {
  profile: {
    photo: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    gender: 'женщина',
    abilities: [],
    mother: {
      first_name: '',
      last_name: '',
      middle_name: '',
      photo: '',
      uuid: '',
    },
    father: {
      first_name: '',
      last_name: '',
      middle_name: '',
      photo: '',
      uuid: '',
    },
    dob: '12.12.2000',
    dod: '',
    location: { latitude: 53.95, longitude: 30.33 },
    wishes: [],
  },
  loading: false,
  auth: false,
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
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
  extraReducers: {
    //for thunk!
    [thunkGetProfile.fulfilled.type]: (
      state,
      action: PayloadAction<profileData>,
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

export const { getProfile, setAuth } = MainReducer.actions;
