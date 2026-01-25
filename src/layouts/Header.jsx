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
import Link from "next/link"
import { deleteCookie } from "@/helpers/cookie"
import { ProfileAvatar } from "@/assets/images"
import { apiManager } from "@/helpers/apiManager"

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
      // 1. Call API to invalidate session on server
      const { data } = await apiManager.post("auth/logout")

      // 2. Remove Cookie (Server Action)
      await deleteCookie()

      // 3. Optional: Manually clear client cookie to be instant
      document.cookie = "accessToken=; Max-Age=0; path=/;"

      // 5. Redirect
      router.push("/login")

      // 4. Clear Redux
      dispatch(clearUser())
      dispatch(showToast({ message: data.message, type: "success" }))
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Logout failed"
      dispatch(showToast({ message: errorMessage, type: "error" }))
      console.error(error)
    } finally {
      setLoading(false)
      handleCloseMenu()
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
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: "black" }}>
          {`${user?.first_name || ""} ${user?.last_name || ""}`}
        </Typography>
        <IconButton onClick={handleOpenMenu}>
          <Avatar alt="Profile" src={ProfileAvatar.src || ""} />
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
