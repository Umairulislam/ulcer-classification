"use client"

import { Card, CardHeader, CardContent, Box, Chip } from "@mui/material"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { classificationTrendMock } from "@/features/dashboard/dashboard.mock"

const ClassificationTrendChart = () => {
  return (
    <Card>
      <CardHeader
        title="Classifications this week"
        action={<Chip label="Demo data" size="small" variant="outlined" />}
      />
      <CardContent>
        <Box sx={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <AreaChart data={classificationTrendMock} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="classifications"
                stroke="#4F46E5"
                strokeWidth={2}
                fill="url(#trendFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ClassificationTrendChart
