"use client"

import { type ReactNode } from "react"
import { selectAuthStatus } from "@/features/auth/authSlice"
import { useAppSelector } from "@/store/hooks"
import { useGetMeQuery } from "@/features/auth/authApi"
import { Box, CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import theme from "@/theme/theme"

function AuthGate({ children }: { children: ReactNode }) {
  const status = useAppSelector(selectAuthStatus)

  useGetMeQuery(undefined, { skip: status !== "loading" })

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={32} />
      </Box>
    )
  }

  return <>{children}</>
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthGate>{children}</AuthGate>
      </ThemeProvider>
    </Provider>
  )
}
