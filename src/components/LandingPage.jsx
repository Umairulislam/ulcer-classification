"use client"

import React from "react"
import { Button, Container, Typography, Box, Grid2 } from "@mui/material"
import { useRouter } from "next/navigation"

const LandingPage = () => {
  const router = useRouter()

  const handleAdminLogin = () => {
    router.push("/login")
  }

  const handleDoctorLogin = () => {
    router.push("/login")
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Hospital Management System
        </Typography>
        <Typography variant="h6" paragraph>
          Efficiently manage your hospital with easy-to-use tools.
        </Typography>

        <Grid2 container spacing={2} justifyContent="center">
          <Grid2 item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAdminLogin}
            >
              Login as Admin
            </Button>
          </Grid2>
          <Grid2 item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleDoctorLogin}
            >
              Login as Doctor
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  )
}

export default LandingPage
