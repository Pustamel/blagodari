import axios from 'axios';
import { Connection, User } from '../types/types';
import { getCookie } from '../utils/functions';

const instance = axios.create({
  baseURL: 'https://api.blagoroda.org/api/',
});

// const token =
//   getCookie('tokenAuth') !== null && getCookie('tokenAuth') !== undefined
//     ? getCookie('tokenAuth')
//     : '';

const user_uuid =
  getCookie('uuid') !== null && getCookie('uuid') !== undefined
    ? getCookie('uuid')
    : '';

export interface FetchUserConnectionsGraph {
  users: User[];
  connections: Connection[];
}

export const fetchUserConnectionsGraph = async (from = 0, number = 25) => {
  const { data } = await instance.get<FetchUserConnectionsGraph>(
    'getstats/user_connections_graph',
    {
      params: {
        from,
        number,
      },
    },
  );
  return data;
};

export const authTelegram = async (user: object) => {
  const body = JSON.stringify(user);
  const headers = { 'Content-Type': 'application/json' };
  const { data } = await instance.post('auth/telegram', body, { headers });
  document.cookie = `tokenAuth=${data.auth_token}`;
  document.cookie = `uuid=${data.user_uuid}`;
  return data;
};

export const getProfileInfo = async () => {
  const headers = { 'Content-Type': 'application/json' };
  const { data } = await instance.get(`profile?uuid=${user_uuid}`, { headers });

  return data;
};

// export const getAddresses = async ({latLng}:any) => { // need billing
//   const lat = `53.95,30.33`
//   const latlngs = encodeURIComponent(latLng)
//   const key = 'AIzaSyC3u8u23ct68CEAxVm984B5h2lyFmJgH64'
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&region=RU&language=ru&latlng=${lat}&location_type=ROOFTOP&result_type=street_address`
//
//   const response = await fetch(url).catch(() =>
//     Promise.reject(new Error("Error fetching data"))
//   );
//
//   const json = await response.json().catch(() => {
//     return Promise.reject(new Error("Error parsing server response"));
//   });
//
//   console.log(json)
// }
