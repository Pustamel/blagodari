import axios from 'axios';
import React, { useEffect, useState } from 'react';
interface User {
  uuid: string;
}

interface Connection {
  source: string;
  target: string;
}

const url: string = 'https://api.blagodarie.org/api/getstats/user_connections_graph?from=0&number=25'

export const GraphPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  useEffect(() => {

    const fetchData = async () => {
      const { data } = await axios.get(url)
      setUsers(data.users)
      setConnections(data.connections)
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <h1>GraphPage</h1>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => {
          return <li key={user.uuid} >
            id: {user.uuid}
          </li>
        })}
      </ul>
      <h2>Connection:</h2>
      <ul>
        {connections.map((connection, index) => {
          return <li key={index}>
            {connection.source}  {connection.target}
          </li>
        })}
      </ul>
    </React.Fragment>
  )
}
