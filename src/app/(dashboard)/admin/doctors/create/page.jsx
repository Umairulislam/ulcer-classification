import { Box, Container, Grid2, TextField, Typography } from "@mui/material"
import React from "react"

const page = () => {
  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Create Doctor
      </Typography>
      <Box component="form" sx={{ width: "100%", marginTop: 4 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              fullWidth
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <TextField
              id="outlined-basic"
              label="Gendar"
              variant="outlined"
              fullWidth
            />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  )
}

export default page
