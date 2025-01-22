// import React from "react"
// import { List, ListItem, ListItemText, Drawer, Typography } from "@mui/material"

// const Sidebar = () => {
//   const menuItems = [
//     { text: "Doctors", link: "/admin/doctors" },
//     { text: "Patients", link: "/admin/patients" },
//   ]

//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: 240,
//         "& .MuiDrawer-paper": {
//           width: 240,
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       <Typography variant="h6" sx={{ textAlign: "center", p: 2 }}>
//         Admin Dashboard
//       </Typography>
//       <List>
//         {menuItems.map((item) => (
//           <ListItem button key={item.text} component="a" href={item.link}>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   )
// }

// export default Sidebar

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
import { Person, People, Schedule, DashboardSharp } from "@mui/icons-material"
import { useRouter, usePathname } from "next/navigation"

const menus = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardSharp /> },
    { label: "Doctors", path: "/admin/doctors", icon: <Person /> },
    { label: "Patients", path: "/admin/patients", icon: <People /> },
  ],
  doctor: [
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
            button
            onClick={() => handleMenuClick(menu.path)}
            sx={{
              cursor: "pointer",
              borderRadius: "10px",
              marginY: "2px",
              backgroundColor: pathname === menu.path ? "#00A9FF" : "inherit",
              color: pathname === menu.path ? "white" : "inherit",
              "&:hover": {
                backgroundColor: "#80D4FF",
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
        {/* Doctors Menu */}
        {/* <ListItem
          button
          onClick={() => handleMenuClick("/admin/doctors")}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            marginY: "2px",

            backgroundColor:
              pathname === "/admin/doctors" ? "#00A9FF" : "inherit",
            color: pathname === "/admin/doctors" ? "white" : "inherit",
            "&:hover": {
              backgroundColor: "#80D4FF", // Light shade of #00A9FF
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: pathname === "/admin/doctors" ? "white" : "inherit",
            }}
          >
            <Person />
          </ListItemIcon>
          <ListItemText primary="Doctors" />
        </ListItem> */}

        {/* Patients Menu */}
        {/* <ListItem
          button
          onClick={() => handleMenuClick("/admin/patients")}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            backgroundColor:
              pathname === "/admin/patients" ? "#00A9FF" : "inherit",
            color: pathname === "/admin/patients" ? "white" : "inherit",
            "&:hover": {
              backgroundColor: "#80D4FF", // Light shade of #00A9FF
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: pathname === "/admin/patients" ? "white" : "inherit",
            }}
          >
            <People />
          </ListItemIcon>
          <ListItemText primary="Patients" />
        </ListItem> */}
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
