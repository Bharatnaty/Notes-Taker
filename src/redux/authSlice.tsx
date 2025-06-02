import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  username: string
  email: string
  password: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.user = action.payload
      state.isAuthenticated = false
      state.error = null
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        const parsed = JSON.parse(savedUser)
        if (
          parsed.email === action.payload.email &&
          parsed.password === action.payload.password
        ) {
          state.user = parsed
          state.isAuthenticated = true
          state.error = null
        } else {
          state.error = 'Invalid email or password'
        }
      } else {
        state.error = 'No user registered'
      }
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
    },
  },
})

export const { register, login, logout } = authSlice.actions
export default authSlice.reducer
