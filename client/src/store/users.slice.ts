import axios from 'axios'
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { User, UsersState } from '../utilities/types'

const initialState: UsersState = {
  users: [],
  onlineUsersByUsername: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setOnlineUsersByUsername: (state, { payload }: PayloadAction<string[]>) => {
      state.onlineUsersByUsername = payload
    },
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.users.push(payload)
    },
    setLoading: (state) => {
      state.loading = true
    },
    setLoadingComplete: (state) => {
      state.loading = false
    },
  },
})

export const {
  setUsers,
  addUser,
  setOnlineUsersByUsername,
  setLoading,
  setLoadingComplete,
} = usersSlice.actions
export default usersSlice.reducer

// Action
export function getUsers() {
  return async (dispatch: Dispatch, getState: () => {}) => {
    dispatch(setLoading())

    try {
      const { data } = await axios('/api/users')

      dispatch(setUsers(data.users))
    } catch (e) {
      // Not handling errors
      console.log(e)
    } finally {
      dispatch(setLoadingComplete())
    }
  }
}
