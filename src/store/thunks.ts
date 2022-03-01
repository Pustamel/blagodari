import {
  addAbility,
  addProfileParent,
  addWishes,
  changeDataProfile,
  getProfileInfo,
} from '../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { parent } from './thunkTypes';

interface getProfileProps {
  uuid: string;
}

export const thunkGetProfile = createAsyncThunk(
  'getProfile/me',
  async (props: getProfileProps, thunkAPI) => {
    try {
      const response = await getProfileInfo(props.uuid);
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
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить профиль');
    }
  },
);

interface propsChangeProfile {
  field: string;
  data: any;
}

export const thunkChangeProfile = createAsyncThunk(
  'updateProfile',
  async (props: propsChangeProfile, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await changeDataProfile(props.field, props.data);
      fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue('Не удалось обновить профиль');
    }
  },
);

interface propsAddWishAndAbility {
  field: string;
  data: {
    text: string;
    last_edit: number;
  };
}

export const thunkAddWish = createAsyncThunk(
  'addWish',
  async (
    props: propsAddWishAndAbility,
    { rejectWithValue, fulfillWithValue },
  ) => {
    try {
      const response = await addWishes(props.data.text, props.data.last_edit);
      fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue('Не удалось обновить профиль');
    }
  },
);

export const thunkAddAbility = createAsyncThunk(
  'addAbility',
  async (
    props: propsAddWishAndAbility,
    { rejectWithValue, fulfillWithValue },
  ) => {
    try {
      const response = await addAbility(props.data.text, props.data.last_edit);
      fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue('Не удалось обновить профиль');
    }
  },
);

export const thunkAddParent = createAsyncThunk(
  'addParent',
  async (props: parent, { rejectWithValue, fulfillWithValue }) => {
    try {
      const parentObject = {
        name: props.data.name,
        photo: props.data.photo !== undefined ? props.data.photo : '',
        dod: props.data.dod !== undefined ? props.data.dod : '',
        dob: props.data.dob !== undefined ? props.data.dob : '',
        gender: props.data.gender !== undefined ? props.data.gender : '',
        latitude: props.data.latitude !== undefined ? props.data.latitude : '',
        longitude:
          props.data.longitude !== undefined ? props.data.longitude : '',
      };
      const response = await addProfileParent(props.field, {
        data: parentObject,
      });
      fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue('Не удалось обновить профиль');
    }
  },
);
