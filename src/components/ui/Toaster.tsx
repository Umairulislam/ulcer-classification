"use client"

import { Snackbar, Alert } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { dismissToast, selectCurrentToast } from "@/features/toast/toastSlice"
import { shadow } from "@/theme/tokens"

const Toaster = () => {
  const dispatch = useAppDispatch()
  const toast = useAppSelector(selectCurrentToast)

  if (!toast) return null

  const handleClose = (_event?: unknown, reason?: string) => {
    // Clicking elsewhere on the page shouldn't dismiss a toast the user
    // may not have finished reading.
    if (reason === "clickaway") return
    dispatch(dismissToast(toast.id))
  }

  return (
    // key={toast.id} remounts the Snackbar per toast, so the auto-hide
    // timer restarts cleanly for each one in the queue.
    <Snackbar
      key={toast.id}
      open
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity={toast.severity}
        variant="filled"
        onClose={handleClose}
        sx={{ width: "100%", boxShadow: shadow.dropdown }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  )
}

export default Toaster
