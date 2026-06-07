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
      main: "#4CAF50",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#F44336",
      contrastText: "#FFFFFF",
    },
  },

  components: {
    // --- Global styles ---
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },

    // --- Button defaults ---
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },

    // --- TextField defaults ---
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    // --- TableCell defaults ---
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "white",
          backgroundColor: "#009689",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        },
      },
    },

    // --- Paper defaults ---
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid lightgray",
        },
      },
    },

    // --- IconButton action style ---
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#EBEBEB",
          "&:hover": {
            backgroundColor: "#00BBA7",
            color: "white",
          },
        },
      },
    },
  },
})

export default theme
