import { combineReducers, Reducer } from 'redux'

import { RootState } from '../utilities/types'
import authReducer from './auth.slice'
import usersReducer from './users.slice'
import messagesReducer from './messages.slice'

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
  usersState: usersReducer,
  messagesState: messagesReducer,
})
