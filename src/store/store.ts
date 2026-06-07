import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import toastReducer from "./toastSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
  },
})

// Infer types directly from store — no manual typing needed
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
