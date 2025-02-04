"use client"

import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { AccountCircle, Lock, ExitToApp } from "@/assets/icons"
import { usePathname, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "@/store/userSlice"
import { showToast } from "@/store/toastSlice"
import { AxiosInstance } from "@/components"
import Link from "next/link"
import { deleteCookie } from "@/helpers/cookie"

const Header = ({ isSmallScreen, handleDrawerToggle }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useSelector((state) => state.user)
  const pathname = usePathname()
  const basePath = pathname.split("/")[1]
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      const { data } = await AxiosInstance.post("auth/logout")
      localStorage.removeItem("accessToken")
      await deleteCookie()
      dispatch(clearUser())
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/login")
    } catch (error) {
      dispatch(
        showToast({ message: error.response.data.message, type: "error" }),
      )
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isSmallScreen ? "100%" : "calc(100% - 250px)",
        ml: isSmallScreen ? 0 : "250px",
        backgroundColor: "white",
        boxShadow: (0, 0, 0, 0),
      }}
    >
      <Toolbar>
        {isSmallScreen && (
          <IconButton edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, color: "black" }}
        >
          Admin Panel
        </Typography>
        <IconButton onClick={handleOpenMenu}>
          <Avatar alt="Profile" src="" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Link href={`/${basePath}/profile/${user?.id}/update-profile`}>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
          </Link>
          <Link href={`/${basePath}/profile/${user?.id}/update-password`}>
            <MenuItem onClick={handleCloseMenu}>
              <ListItemIcon>
                <Lock fontSize="small" />
              </ListItemIcon>
              Change Password
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout} disabled={loading}>
            <ListItemIcon>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
      <Divider />
    </AppBar>
  )
}

export default Header
