"use client"

import { Card, CardHeader, CardContent, Box, Chip } from "@mui/material"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { wagnerGradeMock } from "@/features/dashboard/dashboard.mock"

// Lightest → darkest indigo, matching the primary palette scale in tokens.ts
const GRADE_COLORS = ["#A5B4FC", "#818CF8", "#6366F1", "#4F46E5", "#4338CA", "#3730A3"]

const WagnerGradeChart = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        title="Results by Wagner grade"
        action={<Chip label="Demo data" size="small" variant="outlined" />}
      />
      <CardContent>
        <Box sx={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={wagnerGradeMock}
                dataKey="count"
                nameKey="grade"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {wagnerGradeMock.map((entry, index) => (
                  <Cell key={entry.grade} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                height={48}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default WagnerGradeChart
