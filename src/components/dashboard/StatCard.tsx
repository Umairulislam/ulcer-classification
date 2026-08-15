import { Card, CardContent, Box, Typography, Avatar } from "@mui/material"
import { alpha } from "@mui/material/styles"
import type { SvgIconComponent } from "@mui/icons-material"

interface StatCardProps {
  label: string
  value: number | string
  icon: SvgIconComponent
  color?: "primary" | "success" | "warning" | "info"
}

const StatCard = ({ label, value, icon: Icon, color = "primary" }: StatCardProps) => {
  return (
    <Card>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          variant="rounded"
          sx={(theme) => ({
            bgcolor: alpha(theme.palette[color].main, 0.12),
            color: theme.palette[color].main,
            width: 48,
            height: 48,
          })}
        >
          <Icon />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default StatCard
