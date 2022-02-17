import axios from 'axios';
import { Connection, User } from '../types/types';

const instance = axios.create({
  baseURL: 'https://api.blagoroda.org/api/',
});

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
  document.cookie = `${data.user_uuid}=${data.auth_token}`;
  console.log('data:', data);
  return data;
};
