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
  document.cookie = `token=${data.auth_token}`;
  document.cookie = `uuid=${data.user_uuid}`;
  return data;
};

export const getProfileInfo = async () => {
  const headers = { 'Content-Type': 'application/json' };
  const { data } = await instance.get(`profile?uuid=${user_uuid}`, { headers });

  return data;
};
