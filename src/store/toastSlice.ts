import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastState {
  isVisible: boolean
  message: string
  type: ToastType
}

interface ShowToastPayload {
  message: string
  type?: ToastType
}

const initialState: ToastState = {
  isVisible: false,
  message: "",
  type: "success",
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ShowToastPayload>) => {
      state.isVisible = true
      state.message = action.payload.message
      state.type = action.payload.type ?? "success"
    },
    hideToast: (state) => {
      state.isVisible = false
      state.message = ""
    },
  },
})

export type { ToastType, ToastState }
export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer
