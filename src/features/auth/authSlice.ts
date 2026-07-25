import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { AuthState, User } from "./types"
import { RootState } from "@/store/store"

const ACCESS_TOKEN_KEY = "access_token"

const readStoredToken = (): string | null => {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}
const persistToken = (token: string) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
}
const clearStoredToken = () => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
}

const storedToken = readStoredToken()
const initialState: AuthState = {
  user: null,
  accessToken: storedToken,
  status: storedToken ? "loading" : "unauthenticated",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.status = "authenticated"
      persistToken(action.payload.accessToken)
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.status = "authenticated"
    },

    logOut: (state) => {
      state.user = null
      state.accessToken = null
      state.status = "unauthenticated"
      clearStoredToken()
    },
  },
})

export const { setCredentials, setUser, logOut } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectIsAuthenticated = (state: RootState) => state.auth.status === "authenticated"

export default authSlice.reducer
