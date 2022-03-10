import {
  addAbility,
  addProfileParent,
  addWishes,
  changeDataProfile,
  fetchChangeParent,
  fetchConnectWithParent,
  FetchSearchProfileByName,
  getProfileInfo,
} from '../api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getProfileProps,
  parent,
  propsAddWishAndAbility,
  propsChangeFiledParent,
  propsChangeProfile,
} from './types/thunkTypes'
import { deleteParent } from './Profile'
import { uuid } from '../utils/constants'

export const thunkGetProfile = createAsyncThunk(
  'getProfile/me',
  async (props: getProfileProps, thunkAPI) => {
    try {
      const response = await getProfileInfo(props.uuid)
      return {
        photo: response.photo,
        name: response.first_name,
        gender: response.gender,
        abilities: response.abilities,
        mother: response?.mother,
        father: response?.father,
        dob: response.dob,
        dod: response.dod,
        latitude: response.latitude,
        longitude: response.longitude,
        wishes: response.wishes,
      }
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить профиль')
    }
  },
)

export const thunkChangeProfile = createAsyncThunk(
  'updateProfile',
  async (props: propsChangeProfile, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await changeDataProfile(props.field, props.data)
      fulfillWithValue(response)
    } catch (error) {
      return rejectWithValue('Не удалось обновить профиль')
    }
  },
)

export const thunkAddWish = createAsyncThunk(
  'addWish',
  async (props: propsAddWishAndAbility, { rejectWithValue }) => {
    try {
      return await addWishes(props.data.text, props.data.last_edit)
    } catch (error) {
      return rejectWithValue('Не удалось добавить потребность')
    }
  },
)

export const thunkAddAbility = createAsyncThunk(
  'addAbility',
  async (props: propsAddWishAndAbility, { rejectWithValue }) => {
    try {
      return await addAbility(props.data.text, props.data.last_edit)
    } catch (error) {
      return rejectWithValue('Не удалось добавить возможность')
    }
  },
)

export const thunkAddParent = createAsyncThunk(
  'addParent',
  async (props: parent, { rejectWithValue, fulfillWithValue }) => {
    try {
      const parentObject = {
        first_name: props.data.first_name,
        photo: props.data.photo !== undefined ? props.data.photo : '',
        dod: props.data.dod !== undefined ? props.data.dod : '',
        dob: props.data.dob !== undefined ? props.data.dob : '',
        gender: props.data.gender !== undefined ? props.data.gender : '',
        latitude:
          props.data.latitude !== undefined ? props.data.latitude : null,
        longitude:
          props.data.longitude !== undefined ? props.data.longitude : null,
      }
      const response = await addProfileParent(props.field, {
        data: parentObject,
      })
      fulfillWithValue(response)
    } catch (error) {
      return rejectWithValue('Не удалось добавить родственника')
    }
  },
)

export const thunkChangeFieldParent = createAsyncThunk(
  'changeParent',
  async (props: propsChangeFiledParent, { rejectWithValue }) => {
    try {
      return await fetchChangeParent(props.field, props.data, props.uuid)
    } catch (error) {
      return rejectWithValue('Не удалось изменить поле')
    }
  },
)

export const thunkSearchByName = createAsyncThunk(
  'searchByName',
  async (props: { name: string }, { rejectWithValue }) => {
    try {
      return await FetchSearchProfileByName(props.name)
    } catch (error) {
      return rejectWithValue('Не удалось найти')
    }
  },
)

export const thunkConnectParent = createAsyncThunk(
  'connectUserWithParent',
  async (
    props: { uuid: string; parent: 'father' | 'mother' | 'not_parent' },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await fetchConnectWithParent(props.uuid, props.parent)
      if (props.parent === 'not_parent') {
        dispatch(deleteParent({ props }))
      }
      dispatch(thunkGetProfile({ uuid: uuid || '' }))
      return response
    } catch (error) {
      return rejectWithValue('Не удалось найти')
    }
  },
)
