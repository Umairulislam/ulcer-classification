import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loggedIn: false,
  user: null, // Default state when no user is logged in
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true
      state.user = action.payload // Save the logged-in user
    },
    clearUser: (state) => {
      state.user = null // Clear the user on logout
      state.loggedIn = false
    },
  },
})

export const { setUser, clearUser } = userSlice.actions // Export actions for use in components
export default userSlice.reducer // Export the reducer for the store
