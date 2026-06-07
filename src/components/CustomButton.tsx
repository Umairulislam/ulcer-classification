import React, { ElementType } from "react"
import { Button, ButtonProps } from "@mui/material"

interface CustomButtonProps extends ButtonProps {
  text: string
  icon?: ElementType
}

const CustomButton = ({ text, icon: Icon, onClick, ...props }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        fontWeight: "bold",
        paddingX: "20px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        "&:hover": {
          backgroundColor: "primary.light",
          color: "white",
        },
      }}
      {...props}
    >
      {Icon && <Icon />}
      {text}
    </Button>
  )
}

export default CustomButton
