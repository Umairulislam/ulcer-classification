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
} from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { clearUser } from "@/store/userSlice"
import { showToast } from "@/store/toastSlice"
import { AxiosInstance } from "@/components"

const Header = ({ isSmallScreen, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

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
      localStorage.removeItem("role")
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
          <MenuItem
            onClick={() => {
              router.push("profile")
              handleCloseMenu()
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout()
              handleCloseMenu()
            }}
            disabled={loading}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
      <Divider />
    </AppBar>
  )
}

export default Header
