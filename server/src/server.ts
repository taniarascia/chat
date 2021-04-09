import express, { Express, Request, Response } from 'express'
import * as http from 'http'
import * as socketio from 'socket.io'
import cors from 'cors'

import { User, Message, Session } from './types'
import { getUniqueUsersOnlineByUsername } from './utilities'
import { PORT, CLIENT_HOST } from './config'

const app: Express = express()

// Set up http server and socket server
const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: CLIENT_HOST,
    credentials: true,
  },
})

app.use(cors())

// =======================================================================================
// Memory storage for (temporary) data persistence
// =======================================================================================

let messages: Message[] = []
let users: User[] = []
let activeUserSessions: Session[] = []

// =====================================================================================
// API routes for accessing all message and user data on initial login
// =====================================================================================

app.get('/api/messages', (request: Request, response: Response) => {
  response.send({ messages })
})

app.get('/api/users', (request: Request, response: Response) => {
  response.send({ users })
})

// =====================================================================================
// Socket.io instance
// =====================================================================================

io.on('connection', (socket) => {
  const { id } = socket.client
  console.log(`new client session: ${id}`)

  // =====================================================================================
  // New login
  // =====================================================================================

  socket.on('new login', (user: User) => {
    console.log(`user connected: ${user.username}`)

    // Add the new login to the list of all users
    if (!users.some((existingUser) => existingUser.username === user.username)) {
      users = [...users, user]
      io.emit('new user added', user)
    }

    // Save the current username/session combination
    socket.sessionUsername = user.username
    activeUserSessions.push({
      session: id,
      username: user.username,
    })

    io.emit('users online', getUniqueUsersOnlineByUsername(activeUserSessions))
  })

  // =====================================================================================
  // Send Message
  // =====================================================================================

  socket.on('send message', (message: Message) => {
    console.log(`message: ${message.author}: ${message.content}`)

    messages.push(message)

    io.emit('receive message', message)
  })


  // =====================================================================================
  // User Typing...
  // =====================================================================================

  socket.on('typing...', (username: string) => {
    console.log(`User Typing...: ${username}`)


    io.emit('user starts typing...', username)
  })

  // =====================================================================================
  // User Stopped Typing...
  // =====================================================================================

  socket.on('stopped typing...', (username: string) => {
    console.log(`User Stopped Typing...: ${username}`)


    io.emit('user stopped typing...', username)
  })

  // =====================================================================================
  // Disconnect
  // =====================================================================================

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.sessionUsername}`)
    // Remove the current session
    // The same user may have multiple client sessions open so this prevents incorrect display
    activeUserSessions = activeUserSessions.filter(
      (user) => !(user.username === socket.sessionUsername && user.session === id)
    )

    io.emit('users online', getUniqueUsersOnlineByUsername(activeUserSessions))
  })
})

app.set('port', PORT)

// Start server
server.listen(PORT, () => {
  console.log('listening on *:5000')
})
