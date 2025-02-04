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
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts"

const DoctorDashboard = () => {
  // Hard-coded data
  const quickStats = [
    { title: "Total Patients", value: 50 },
    { title: "Pending Classifications", value: 10 },
    { title: "Completed Classifications", value: 40 },
  ]

  const upcomingAppointments = [
    { id: 1, patient: "John Doe", date: "2024-03-15", time: "10:00 AM" },
    { id: 2, patient: "Jane Smith", date: "2024-03-16", time: "11:00 AM" },
    { id: 3, patient: "Alice Johnson", date: "2024-03-17", time: "12:00 PM" },
  ]

  const classificationData = [
    { name: "Completed", value: 40 },
    { name: "Pending", value: 10 },
  ]

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Doctor Dashboard
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

      {/* Upcoming Appointments */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Upcoming Appointments
        </Typography>
        <TableContainer sx={{ border: "1px solid lightgray" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Classification Chart */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Classifications
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={classificationData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#00A9FF"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  )
}

export default DoctorDashboard
