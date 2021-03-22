import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../utilities/types'

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = usersSlice.actions
export default usersSlice.reducer
