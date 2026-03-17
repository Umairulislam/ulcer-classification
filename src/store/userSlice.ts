import { UserRecord } from "@/types/api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  loggedIn: boolean
  user: UserRecord | null
}

const initialState: UserState = {
  loggedIn: false,
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserRecord>) => {
      state.loggedIn = true
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
      state.loggedIn = false
    },
  },
})

export type { UserState }
export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
