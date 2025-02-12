import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#009689",
      light: "#00BBA7",
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
