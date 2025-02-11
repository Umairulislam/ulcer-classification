"use client"

import { AxiosInstance, DashboardCard, StatusChip } from "@/components"
import {
  Box,
  Container,
  Grid2,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useEffect, useState } from "react"
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts"

const DoctorDashboard = () => {
  const [doctorStats, setDoctorStats] = useState({})
  const [loading, setLoading] = useState(false)

  const getStats = async () => {
    setLoading(true)
    try {
      const { data } = await AxiosInstance.get("dashboard/doctor")
      setDoctorStats(data?.response?.details)
      console.log("🚀 ~ getStats ~ data:", data)
    } catch (error) {
      console.log("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStats()
  }, [])

  // Hard-coded data

  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Doe",
      age: 31,
      classified: true,
      date: "2024-03-15",
    },
    {
      id: 2,
      patient: "Jane Smith",
      age: 32,
      classified: false,
      date: "2024-03-16",
    },
    {
      id: 3,
      patient: "Alice Johnson",
      age: 35,
      classified: true,
      date: "2024-03-17",
    },
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
        {Object.entries(doctorStats).map(([key, value]) => (
          <DashboardCard
            key={key}
            title={key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
            value={value}
          />
        ))}
      </Grid2>

      {/* Classification table */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Patient Classification Overview
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ border: "1px solid lightgray" }}>
              <TableRow>
                {tableHead.map((head, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      color: "white",
                      backgroundColor: "primary.main",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: "1px solid lightgray" }}>
              {upcomingAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{appointment.age}</TableCell>
                  <TableCell>
                    <StatusChip status={appointment.classified} />
                  </TableCell>
                  <TableCell>{appointment.date}</TableCell>
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

const tableHead = ["Patient", "Age", "Classification Status", "Date Classified"]
