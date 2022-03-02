import {
  initialStateType,
  profileData,
  propsChangeParent,
  propsProfileField,
} from './types/typesProfile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  thunkChangeFieldParent,
  thunkChangeProfile,
  thunkGetProfile,
} from './thunks';

const initialState: initialStateType = {
  profile: {
    photo: '',
    name: 'name',
    gender: 'женщина',
    abilities: [],
    mother: {
      gender: '',
      first_name: '',
      photo: '',
      uuid: '',
      longitude: '',
      latitude: '',
      dod: null,
      dob: null,
    },
    father: {
      gender: '',
      first_name: '',
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
      ...state.profile.father,
      [field]: action.payload.data,
    };
  }
};

export const MainReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    changeProfileField: changeFieldProfile,
    changeParentFields: changeParent,
  },
  extraReducers: {
    [thunkGetProfile.fulfilled.type]: (
      state,
      action: PayloadAction<profileData>,
    ) => {
      state.profile = action.payload;
    },
    [thunkGetProfile.pending.type]: state => {
      state.loading = true;
    },
    [thunkGetProfile.rejected.type]: state => {
      state.loading = false;
    },
    [thunkChangeProfile.fulfilled.type]: (state, action) => {
      console.log(action);
      const field = action.meta.arg.field;
      const data = action.meta.arg.data;
      state.profile = {
        ...state.profile,
        [field]: data,
      };
    },
    [thunkChangeFieldParent.fulfilled.type]: (state, action) => {
      const field = action.meta.arg.field;
      const parent = action.meta.arg.typeField;
      const data = action.payload;
      if (parent === 'mother' && state.profile.mother !== null) {
        state.profile.mother = {
          ...state.profile.mother,
          [field]: data[field],
        };
      } else if (parent === 'father' && state.profile.father !== null) {
        state.profile.father = {
          ...state.profile.father,
          [field]: data[field],
        };
      }
    },
  },
});

export const { setAuth, changeParentFields } = MainReducer.actions;
