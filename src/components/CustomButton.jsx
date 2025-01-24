import React from "react"
import { Button } from "@mui/material"

const CustomButton = ({ text, icon: Icon, onClick, ...props }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        textTransform: "none",
        fontWeight: "bold",
        paddingX: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
      {...props} // Allow overriding or extending styles
    >
      {Icon && <Icon />} {/* Render the icon only if provided */}
      {text}
    </Button>
  )
}

export default CustomButton
