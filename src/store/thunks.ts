import {
  addAbility,
  addWishes,
  changeDataProfile,
  getProfileInfo,
} from '../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkGetProfile = createAsyncThunk(
  'getProfile/me',
  async (_, thunkAPI) => {
    try {
      const response = await getProfileInfo();
      return {
        photo: response.photo,
        name: response.first_name,
        gender: response.gender,
        abilities: response.abilities,
        mother: response.mother,
        father: response.father,
        dob: response.dob,
        dod: response.dod,
        location: {
          latitude: response.latitude,
          longitude: response.longitude,
        },
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
      console.log('props:', props);
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
