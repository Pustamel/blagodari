import { getProfileInfo } from '../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkGetProfile = createAsyncThunk(
  'getProfile/me',
  async (_, thunkAPI) => {
    try {
      const response = await getProfileInfo();
      const getParent = (field: string) => {
        return {
          first_name: response[field].first_name,
          last_name: response[field].last_name,
          middle_name: response[field].middle_name,
          uuid: response[field].uuid,
          photo: response[field].photo,
          location: {
            latitude: response[field].latitude,
            longitude: response[field].longitude,
          },
        };
      };

      return {
        photo: response.photo,
        first_name: response.first_name,
        last_name: response.last_name,
        middle_name: response.middle_name,
        gender: response.gender,
        abilities: response.abilities,
        mother: getParent('mother'),
        father: getParent('father'),
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
