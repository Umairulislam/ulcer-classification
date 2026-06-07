"use client"

import React, { useState } from "react"
import { Box, useTheme, useMediaQuery } from "@mui/material"
import { Sidenav, Header } from "@/layouts"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))
  const role = user?.role ?? null

  const handleDrawerToggle = (): void => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Header isSmallScreen={isSmallScreen} handleDrawerToggle={handleDrawerToggle} />
      <Sidenav
        role={role}
        isSmallScreen={isSmallScreen}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default DashboardLayout
