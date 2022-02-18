import { getProfileInfo } from '../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkGetProfile = createAsyncThunk(
  'getProfile/me',
  async (_, thunkAPI) => {
    try {
      const response = await getProfileInfo();
      return {
        photo: response.photo,
        first_name: response.first_name,
        last_name: response.last_name,
        middle_name: response.middle_name,
        gender: response.gender,
        ability: response.ability,
        mother: response.mother,
        father: response.father,
        dob: response.dob,
        dod: response.dod,
        location: {
          latitude: response.latitude,
          longitude: response.longitude,
        },
      };
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить профиль');
    }
  },
);
