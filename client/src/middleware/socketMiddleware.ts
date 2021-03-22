import { Dispatch } from 'redux'

import { addMessage } from '../store/messages.slice'
import { addUser, setOnlineUsersByUsername } from '../store/users.slice'
import { Message, User, RootState } from '../utilities/types'

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params
    const { type, payload } = action

    switch (type) {
      // Connect to the socket when a user logs in
      case 'users/login': {
        socket.connect()

        // Set up all the socket event handlers
        // When these events are received from the socket, they'll dispatch the proper Redux action

        // Update the online users list every time a user logs in or out
        socket.on('users online', (onlineUsers: string[]) => {
          dispatch(setOnlineUsersByUsername(onlineUsers))
        })

        // Append a message every time a new one comes in
        socket.on('receive message', (message: Message) => {
          dispatch(addMessage(message))
        })

        // Append a user every time a new one is registered
        socket.on('new user added', (user: User) => {
          dispatch(addUser(user))
        })

        // Add the current user to the online users list
        socket.emit('new login', payload)

        break
      }
      // Disconnect from the socket when a user logs out
      case 'users/logout': {
        socket.disconnect()

        break
      }
      // Let the server be the source of truth for all messages; don't dispatch anything
      case 'messages/sendMessage': {
        socket.emit('send message', payload)

        return
      }
    }

    return next(action)
  }
}
