"use client"

import { Card, CardHeader, CardContent, Box, Typography, Stack } from "@mui/material"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ClassificationStatusChartProps {
  completed: number
  pending: number
}

const COLORS = { completed: "#4F46E5", pending: "#E2E8F0" }

const ClassificationStatusChart = ({ completed, pending }: ClassificationStatusChartProps) => {
  const total = completed + pending

  // Both zero (no classifications exist yet at all) — a 0/0 donut is
  // meaningless and renders oddly in Recharts, so show a plain state
  // instead of a chart with nothing to show.
  if (total === 0) {
    return (
      <Card sx={{ height: "100%" }}>
        <CardHeader title="Classification status" />
        <CardContent>
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No classifications yet
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }

  const completionRate = Math.round((completed / total) * 100)
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ]

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Classification status" />
      <CardContent>
        <Box sx={{ position: "relative", width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill={COLORS.completed} />
                <Cell fill={COLORS.pending} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              {completionRate}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Completed
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS.completed }} />
            <Typography variant="body2" color="text.secondary">
              Completed ({completed})
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS.pending }} />
            <Typography variant="body2" color="text.secondary">
              Pending ({pending})
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default ClassificationStatusChart
