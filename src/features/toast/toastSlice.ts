import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/store/store"
import type { Toast, ToastState } from "./types"

const initialState: ToastState = { queue: [] }

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: {
      reducer: (state, action: PayloadAction<Toast>) => {
        state.queue.push(action.payload)
      },
      // id is generated here so callers only ever pass message + severity.
      prepare: (toast: Omit<Toast, "id">) => ({
        payload: { id: nanoid(), ...toast },
      }),
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { showToast, dismissToast } = toastSlice.actions
export default toastSlice.reducer

// Only the first toast in the queue is shown at a time — the rest wait
// their turn instead of stacking on top of each other.
export const selectCurrentToast = (state: RootState) => state.toast.queue[0] ?? null
