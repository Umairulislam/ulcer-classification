import { Snackbar, Alert } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { hideToast } from "@/store/toastSlice"

const Toast = () => {
  const { isVisible, message, type } = useSelector((state) => state.toast)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(hideToast())
  }

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      variant="filled"
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
