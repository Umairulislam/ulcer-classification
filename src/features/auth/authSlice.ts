import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { AuthState, User } from "./types"
import { RootState } from "@/store/store"
import { decodeJwt } from "@/utils/decodeJwt"

const ACCESS_TOKEN_KEY = "access_token"
const ACCESS_TOKEN_COOKIE = "accessToken"
const FALLBACK_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

const getCookieMaxAge = (token: string): number => {
  const exp = decodeJwt(token)?.exp
  if (typeof exp !== "number") return FALLBACK_COOKIE_MAX_AGE
  return Math.max(Math.floor(exp - Date.now() / 1000), 0)
}

export const readStoredToken = (): string | null => {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

const persistToken = (token: string) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token)

  // `Secure` only on https, so it doesn't break http://localhost in dev.
  const secure = window.location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${ACCESS_TOKEN_COOKIE}=${token}; path=/; max-age=${getCookieMaxAge(token)}; samesite=lax${secure}`
}

const clearStoredToken = () => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0`
}

const storedToken = readStoredToken()

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
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

    hydrateAuth: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
      state.status = action.payload ? "loading" : "unauthenticated"
    },
  },
})

export const { setCredentials, setUser, logOut, hydrateAuth } = authSlice.actions

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectAuthStatus = (state: RootState) => state.auth.status
export const selectIsAuthenticated = (state: RootState) => state.auth.status === "authenticated"

export default authSlice.reducer
