"use client"

import { AxiosInstance, DashboardCard } from "@/components"
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
import { useEffect, useState } from "react"
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
  const [adminStats, setAdminStats] = useState({})
  const [loading, setLoading] = useState(false)

  const getStats = async () => {
    setLoading(true)
    try {
      const { data } = await AxiosInstance.get("dashboard/admin")
      setAdminStats(data?.response?.details)
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
        {Object.entries(adminStats).map(([key, value]) => (
          <DashboardCard
            key={key}
            title={key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
            value={value}
          />
        ))}
      </Grid2>

      {/* Recent Activity */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Recent Activity
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
            <Bar dataKey="patients" fill="#009689" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  )
}

export default AdminDashboard

const tableHead = ["Action", "Date"]
