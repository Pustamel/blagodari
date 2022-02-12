import axios from 'axios';
import { Connection, User } from '../types/types';

const instance = axios.create({
  baseURL: 'https://api.blagodarie.org/api/'
})

export interface FetchUserConnectionsGraph {
  users: User[],
  connections: Connection[]
}

export const fetchUserConnectionsGraph = async (from = 0, number = 25) => {
  const { data } = await instance.get<FetchUserConnectionsGraph>('getstats/user_connections_graph', {
    params: {
      from,
      number
    }
  })
  return data
}
