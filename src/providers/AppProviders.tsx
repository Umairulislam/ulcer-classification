"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { type ReactNode } from "react"
import { hydrateAuth, readStoredToken, selectAuthStatus } from "@/features/auth/authSlice"
import { useAppSelector } from "@/store/hooks"
import { useGetMeQuery } from "@/features/auth/authApi"
import { Box, CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import theme from "@/theme/theme"
import Toaster from "@/components/ui/Toaster"

function AuthGate({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectAuthStatus)

  useEffect(() => {
    dispatch(hydrateAuth(readStoredToken()))
  }, [dispatch])

  useGetMeQuery(undefined, { skip: status !== "loading" })

  if (status === "idle" || status === "loading") {
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
        <Toaster />
      </ThemeProvider>
    </Provider>
  )
}
