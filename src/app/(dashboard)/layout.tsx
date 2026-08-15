"use client"

import { useState } from "react"
import { Box } from "@mui/material"
import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import { layout } from "@/theme/tokens"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarWidth = collapsed ? layout.drawerWidthCollapsed : layout.drawerWidth

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header
        sidebarWidth={sidebarWidth}
        collapsed={collapsed}
        onMenuClick={() => setMobileOpen(true)}
        onCollapseClick={() => setCollapsed((prev) => !prev)}
      />

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          // ml: { md: `${sidebarWidth}px` },
          transition: (theme) =>
            theme.transitions.create("margin-left", {
              duration: theme.transitions.duration.short,
            }),
        }}
      >
        {/* Spacer matching the fixed header's height */}
        <Box sx={{ height: layout.headerHeight }} />
        <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout
