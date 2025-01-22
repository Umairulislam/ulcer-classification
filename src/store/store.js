import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice" // Import the user slice (we'll create it next)

const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice to the store
  },
})

export default store
