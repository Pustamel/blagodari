import {
  initialStateType,
  profileData,
  propsChangeParent,
  propsProfileField,
} from './types/typesProfile'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  thunkAddAbility,
  thunkAddWish,
  thunkChangeFieldParent,
  thunkChangeProfile,
  thunkGetProfile,
} from './thunks'

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
      longitude: null,
      latitude: null,
      dod: null,
      dob: null,
    },
    father: {
      gender: '',
      first_name: '',
      photo: '',
      uuid: '',
      longitude: null,
      latitude: null,
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
}

const changeFieldProfile = (
  state: any,
  action: { payload: propsProfileField },
) => {
  const field = action.payload.field
  state.profile[field] = action.payload.data
}

const changeParent = (state: any, action: { payload: propsChangeParent }) => {
  const field = action.payload.field
  const typeField = action.payload.typeField

  if (typeField === 'mother') {
    state.profile.mother = {
      ...state.profile.mother,
      [field]: action.payload.data,
    }
  } else if (typeField === 'father') {
    state.profile.father = {
      ...state.profile.father,
      [field]: action.payload.data,
    }
  }
}

export const MainReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload
    },
    changeProfileField: changeFieldProfile,
    changeParentFields: changeParent,
    deleteParent: (state, action) => {
      const id = action.payload.props.uuid
      if (state.profile?.mother?.uuid == id) {
        state.profile = {
          ...state.profile,
          mother: null,
        }
      } else if (state.profile?.father?.uuid == id) {
        state.profile = {
          ...state.profile,
          father: null,
        }
      }
    },
    changeLocation: (state, action) => {
      const lat = action.payload.lat
      const lng = action.payload.lng
      state.profile = {
        ...state.profile,
        latitude: lat,
        longitude: lng,
      }
    },
  },
  extraReducers: {
    [thunkGetProfile.fulfilled.type]: (
      state,
      action: PayloadAction<profileData>,
    ) => {
      state.profile = action.payload
    },
    [thunkGetProfile.pending.type]: state => {
      state.loading = true
    },
    [thunkGetProfile.rejected.type]: state => {
      state.loading = false
    },
    [thunkChangeProfile.fulfilled.type]: (state, action) => {
      const field = action.meta.arg.field
      const data = action.meta.arg.data
      state.profile = {
        ...state.profile,
        [field]: data,
      }
    },
    [thunkChangeFieldParent.fulfilled.type]: (state, action) => {
      const field = action.meta.arg.field
      const parent = action.meta.arg.typeField
      const data = action.payload
      if (parent === 'mother' && state.profile.mother !== null) {
        state.profile.mother = {
          ...state.profile.mother,
          [field]: data[field],
        }
      } else if (parent === 'father' && state.profile.father !== null) {
        state.profile.father = {
          ...state.profile.father,
          [field]: data[field],
        }
      }
    },
    [thunkAddAbility.fulfilled.type]: (state, action) => {
      state.profile = {
        ...state.profile,
        abilities: [...state.profile.abilities, action.payload],
      }
    },
    [thunkAddWish.fulfilled.type]: (state, action) => {
      state.profile = {
        ...state.profile,
        wishes: [...state.profile.wishes, action.payload],
      }
    },
  },
})

export const { setAuth, changeParentFields, deleteParent, changeLocation } =
  MainReducer.actions
