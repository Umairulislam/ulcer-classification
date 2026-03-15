import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "doctor"
}

interface UserState {
  loggedIn: boolean
  user: User | null
}

const initialState: UserState = {
  loggedIn: false,
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.loggedIn = true
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
      state.loggedIn = false
    },
  },
})

export type { User, UserState }
export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
