import {
  initialStateType,
  profileData,
  propsChangeParent,
  propsProfileField,
} from './typesProfile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkGetProfile } from './thunks';

const initialState: initialStateType = {
  profile: {
    photo: '',
    name: 'name',
    gender: 'женщина',
    abilities: [],
    mother: {
      gender: '',
      name: '',
      photo: '',
      uuid: '',
      longitude: '',
      latitude: '',
      dod: null,
      dob: null,
    },
    father: {
      gender: '',
      name: '',
      photo: '',
      uuid: '',
      longitude: '',
      latitude: '',
      dod: null,
      dob: null,
    },
    dob: '12.12.2000',
    dod: null,
    latitude: 53.95,
    longitude: 30.33,
    wishes: [],
  },
  loading: false,
  auth: false,
};

const changeFieldProfile = (
  state: any,
  action: { payload: propsProfileField },
) => {
  const field = action.payload.field;
  state.profile[field] = action.payload.data;
};

const changeParent = (state: any, action: { payload: propsChangeParent }) => {
  const field = action.payload.field;
  const typeField = action.payload.typeField;

  if (typeField === 'mother') {
    state.profile.mother = {
      ...state.profile.mother,
      [field]: action.payload.data,
    };
  } else if (typeField === 'father') {
    state.profile.father = {
      ...state.profile.mother,
      [field]: action.payload.data,
    };
  }
};

export const MainReducer = createSlice({
  name: 'profile',
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
    changeProfileField: changeFieldProfile,
    changeParentFields: changeParent,
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
    // [thunkChangeProfile.fulfilled.type]: (state, action) => {
    //   console.log(action)
    // }
  },
});

// current(state) - for see state

export const testFnction = () => {
  //example simple action
  MainReducer.actions.getProfile();
};

testFnction();

export const { setAuth, changeParentFields } = MainReducer.actions;
