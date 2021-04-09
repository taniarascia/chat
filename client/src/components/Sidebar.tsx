import React from 'react'


import { User } from '../utilities/types'

export interface Props {
  currentUser: User | null
  users: User[],
  typingUsers: string[]
}


export const Sidebar: React.FC<Props> = ({ users, currentUser, typingUsers }) => {

  return (
    <div className="flex-none min-w-300 bg-blue overflow-y-auto">
      <div>
        <h2 className="m-6 text-white font-bold text-lg">Users</h2>
        {users.map((user, i: number) => (
          <div
            key={`${user.username}-${i}`}
            className="p-3 mx-6 my-2 text-white text-opacity-70 bg-blue-dark rounded-md"
          >
            <div className="flex items-center">
              <div
                className={`h-2 w-2 mr-2 rounded-full inline-block ${
                  user.online ? 'bg-green-400' : 'bg-blue-light'
                }`}
              ></div>
              <span>{user.username}</span>
              {user.username === currentUser!.username && (
                <span className="ml-1 text-white text-opacity-30">(you)</span>
              )}
              {typingUsers.find(username => user.username === username) && (
                <span className="ml-1 text-white text-opacity-50 italic"> typing...</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
