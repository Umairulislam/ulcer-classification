import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material"

const AlertDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* Cancel Button - Outlined */}
        <Button
          onClick={onClose}
          color="secondary.main"
          variant="outlined"
          sx={{
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        {/* Confirm Button - Filled */}
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          autoFocus
          sx={{
            textTransform: "none",
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
