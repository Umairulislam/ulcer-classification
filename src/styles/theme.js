import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A9FF",
      light: "#80D4FF",
    },
    secondary: {
      main: "#D3D3D3",
      light: "#EBEBEB",
    },
    success: {
      main: "#4CAF50", // Custom success color
      contrastText: "#FFFFFF", // Text color on success background
    },
    error: {
      main: "#F44336", // Custom error color
      contrastText: "#FFFFFF", // Text color on error background
    },
  },
})

export default theme
