"use client"

import React from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { Person, People, Schedule, Dashboard } from "@/assets/icons"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

const menus = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: <Dashboard /> },
    { label: "Doctors", path: "/admin/doctors", icon: <Person /> },
    { label: "Patients", path: "/admin/patients", icon: <People /> },
  ],
  doctor: [
    { label: "Dashboard", path: "/doctor/dashboard", icon: <Dashboard /> },
    { label: "Appointments", path: "/doctor/appointments", icon: <Schedule /> },
    { label: "Reports", path: "/doctor/reports", icon: <Person /> },
  ],
}

const Sidenav = ({ role, isSmallScreen, mobileOpen, handleDrawerToggle }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick = (path) => {
    router.push(path)
    if (isSmallScreen) handleDrawerToggle()
  }

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Dashboard
        </Typography>
      </Box>
      <List sx={{ padding: "10px", borderRadius: "10px" }}>
        {menus[role]?.map((menu) => (
          <ListItem
            key={menu.label}
            // component={Link}
            // href={menu.path}
            onClick={() => handleMenuClick(menu.path)}
            sx={{
              cursor: "pointer",
              borderRadius: "10px",
              marginY: "2px",
              backgroundColor:
                pathname === menu.path ? "primary.main" : "inherit",
              color: pathname === menu.path ? "white" : "inherit",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname === menu.path ? "white" : "inherit",
              }}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { md: 250 }, flexShrink: { md: 0 } }}
      aria-label="sidebar menus"
    >
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            overflowX: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  )
}

export default Sidenav
