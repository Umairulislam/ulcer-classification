"use client"

import {
  Box,
  Container,
  Grid2,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const AdminDashboard = () => {
  // Hard-coded data
  const quickStats = [
    { title: "Total Doctors", value: 25 },
    { title: "Total Patients", value: 120 },
    { title: "Total Appointments", value: 45 },
  ]

  const recentActivity = [
    { id: 1, action: "New patient added", date: "2024-03-10" },
    { id: 2, action: "Doctor registered", date: "2024-03-09" },
    { id: 3, action: "Appointment scheduled", date: "2024-03-08" },
  ]

  const patientGrowthData = [
    { month: "Jan", patients: 10 },
    { month: "Feb", patients: 20 },
    { month: "Mar", patients: 30 },
    { month: "Apr", patients: 40 },
    { month: "May", patients: 50 },
    { month: "Jun", patients: 60 },
  ]

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Admin Dashboard
      </Typography>

      {/* Quick Stats */}
      <Grid2 container spacing={3} mb={4}>
        {quickStats.map((stat, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card sx={{ border: "1px solid lightgray", boxShadow: "none" }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Recent Activity */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Recent Activity
        </Typography>
        <TableContainer sx={{ border: "1px solid lightgray" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Patient Growth Chart */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Patient Growth
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={patientGrowthData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" fill="#00A9FF" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  )
}

export default AdminDashboard
