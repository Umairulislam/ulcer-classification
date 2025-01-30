"use client"

import React, { useState } from "react"
import { CssBaseline, Box, useTheme, useMediaQuery } from "@mui/material"
import { Sidenav, Header } from "@/layouts"
import { useSelector } from "react-redux"

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user)
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))
  const role = user?.role

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Header
        isSmallScreen={isSmallScreen}
        handleDrawerToggle={handleDrawerToggle}
      />
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

export default Layout
