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
import { RootState, AppDispatch } from "@/store/store"
import { logout } from "@/services/auth"

interface HeaderProps {
  isSmallScreen: boolean
  handleDrawerToggle: () => void
}

const Header = ({ isSmallScreen, handleDrawerToggle }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.user)
  const pathname = usePathname()
  const basePath = pathname.split("/")[1]
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [loading, setLoading] = useState(false)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      const data = await logout()
      await deleteCookie()
      router.push("/login")
      dispatch(clearUser())
      dispatch(showToast({ message: data.message, type: "success" }))
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } }
      const errorMessage = err?.response?.data?.message || "Logout failed"
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
        boxShadow: "none",
        border: "none",
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
