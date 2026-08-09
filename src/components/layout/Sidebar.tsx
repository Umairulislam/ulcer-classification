"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentUser } from "@/features/auth/authSlice"
import { NAV_ITEMS_BY_ROLE } from "@/constants/navigation"
import { layout } from "@/theme/tokens"

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onMobileClose: () => void
}

const Sidebar = ({ collapsed, mobileOpen, onMobileClose }: SidebarProps) => {
  const pathname = usePathname()
  const user = useAppSelector(selectCurrentUser)

  if (!user) return null

  const navItems = NAV_ITEMS_BY_ROLE[user.role]
  const width = collapsed ? layout.drawerWidthCollapsed : layout.drawerWidth

  const navList = (
    <List sx={{ px: 1, py: 1.5 }}>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        const Icon = item.icon

        const button = (
          <ListItemButton
            component={Link}
            href={item.href}
            selected={isActive}
            sx={{
              borderRadius: 1,
              minHeight: 44,
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1.5 : 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 2,
                justifyContent: "center",
                color: isActive ? "primary.main" : "text.secondary",
              }}
            >
              <Icon fontSize="small" />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "primary.main" : "text.primary",
                  },
                }}
              />
            )}
          </ListItemButton>
        )

        return (
          <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
            {collapsed ? (
              <Tooltip title={item.label} placement="right">
                {button}
              </Tooltip>
            ) : (
              button
            )}
          </ListItem>
        )
      })}
    </List>
  )

  const brand = (
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "flex-start",
        px: collapsed ? 1 : 2.5,
      }}
    >
      {collapsed ? (
        <Typography variant="h6" fontWeight={700} color="primary.main">
          UC
        </Typography>
      ) : (
        <Typography variant="h6" fontWeight={700} noWrap>
          Ulcer Classification
        </Typography>
      )}
    </Toolbar>
  )

  return (
    <>
      {/* Desktop — permanent, width toggles between expanded/collapsed */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width,
            overflowX: "hidden",
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.short,
              }),
          },
        }}
      >
        {brand}
        {navList}
      </Drawer>

      {/* Mobile — temporary overlay, always full width, never pushes content */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: layout.drawerWidth },
        }}
      >
        <Box onClick={onMobileClose}>
          {brand}
          {navList}
        </Box>
      </Drawer>
    </>
  )
}

export default Sidebar
