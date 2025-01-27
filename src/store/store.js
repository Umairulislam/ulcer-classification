import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import toastReducer from "./toastSlice"

const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice to the store
    toast: toastReducer, // Toast slice
  },
})

export default store
