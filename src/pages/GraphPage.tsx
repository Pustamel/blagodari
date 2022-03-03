import React, { useEffect, useState } from 'react'
import { fetchUserConnectionsGraph } from '../api/api'
import { Connection, User } from '../types/types'

export const GraphPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserConnectionsGraph()
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
        {users.map(user => {
          return <li key={user.uuid}>id: {user.uuid}</li>
        })}
      </ul>
      <h2>Connection:</h2>
      <ul>
        {connections.map((connection, index) => {
          return (
            <li key={index}>
              {connection.source} {connection.target}
            </li>
          )
        })}
      </ul>
    </React.Fragment>
  )
}
