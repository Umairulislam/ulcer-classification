"use client"

import { useState, type MouseEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentUser } from "@/features/auth/authSlice"
import { useLogoutMutation } from "@/features/auth/authApi"
import { layout } from "@/theme/tokens"

interface HeaderProps {
  sidebarWidth: number
  collapsed: boolean
  onMenuClick: () => void
  onCollapseClick: () => void
}

const Header = ({ sidebarWidth, collapsed, onMenuClick, onCollapseClick }: HeaderProps) => {
  const router = useRouter()
  const user = useAppSelector(selectCurrentUser)
  const [logout] = useLogoutMutation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => setAnchorEl(null)

  const handleLogout = async () => {
    handleMenuClose()
    try {
      await logout().unwrap()
    } finally {
      router.replace("/login")
    }
  }

  const initials = user ? `${user.first_name[0] ?? ""}${user.last_name[0] ?? ""}`.toUpperCase() : ""

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        ml: { md: `${sidebarWidth}px` },
        transition: (theme) =>
          theme.transitions.create(["width", "margin-left"], {
            duration: theme.transitions.duration.short,
          }),
      }}
    >
      <Toolbar
        sx={{ height: layout.headerHeight, minHeight: `${layout.headerHeight}px !important` }}
      >
        {/* Mobile — opens the overlay drawer */}
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop — collapses/expands the permanent drawer */}
        <IconButton
          onClick={onCollapseClick}
          sx={{ display: { xs: "none", md: "inline-flex" }, mr: 1 }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {user && (
          <>
            <IconButton onClick={handleAvatarClick} sx={{ p: 0.5 }}>
              <Avatar sx={{ width: 36, height: 36, p: 2.5 }}>{initials}</Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" noWrap>
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {user.email}
                </Typography>
              </Box>
              <Divider />

              <MenuItem component={Link} href="/profile" onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>

              <MenuItem component={Link} href="/change-password" onClick={handleMenuClose}>
                <ListItemIcon>
                  <LockOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Change password
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
