import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { rootReducer } from './rootReducer'
import socketMiddleware from '../middleware/socketMiddleware'
import SocketClient from '../api/SocketClient'

const socket = new SocketClient()

export const store = configureStore({
  reducer: rootReducer,
  middleware: [socketMiddleware(socket), ...getDefaultMiddleware()],
})
