"use client"

import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Typography,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined"
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined"
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined"
import type { SvgIconComponent } from "@mui/icons-material"
import { formatDistanceToNow } from "date-fns"
import type { ActivityItem, ActivityType } from "@/features/dashboard/dashboard.mock"

const ICONS_BY_TYPE: Record<ActivityType, SvgIconComponent> = {
  classification: PersonSearchOutlinedIcon,
  doctor: LocalHospitalOutlinedIcon,
  patient: PersonAddAltOutlinedIcon,
}

interface RecentActivityProps {
  items: ActivityItem[]
  title?: string
}

const RecentActivity = ({ items, title = "Recent activity" }: RecentActivityProps) => {
  return (
    <Card>
      <CardHeader
        title={title}
        action={<Chip label="Demo data" size="small" variant="outlined" />}
      />
      <CardContent sx={{ pt: 0 }}>
        <List disablePadding>
          {items.map((item) => {
            const Icon = ICONS_BY_TYPE[item.type]
            return (
              <ListItem key={item.id} disableGutters sx={{ py: 1.25 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={(theme) => ({
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      color: theme.palette.primary.main,
                      width: 36,
                      height: 36,
                    })}
                  >
                    <Icon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <strong>{item.actor}</strong> {item.message}
                    </Typography>
                  }
                  secondary={formatDistanceToNow(new Date(item.timestamp), {
                    addSuffix: true,
                  })}
                />
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}

export default RecentActivity
