"use client"

import { Provider } from "react-redux"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import store from "@/store/store"
import theme from "@/theme/theme"
import AppProvider from "@/hoc/AppProvider"

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default Providers
