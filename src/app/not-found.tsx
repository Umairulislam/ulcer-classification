"use client"

import Link from "next/link"
import { Box, Stack, Typography, Button, Avatar } from "@mui/material"
import { alpha } from "@mui/material/styles"
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined"

const NotFound = () => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center" maxWidth={440}>
        <Avatar
          aria-hidden
          sx={(theme) => ({
            width: 72,
            height: 72,
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
          })}
        >
          <SearchOffOutlinedIcon sx={{ fontSize: 36 }} />
        </Avatar>

        <Typography variant="overline" color="primary">
          Error 404
        </Typography>

        <Typography variant="h3" component="h1">
          Page not found
        </Typography>

        <Typography variant="body1" color="text.secondary">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </Typography>

        <Button component={Link} href="/" variant="contained" size="large" sx={{ mt: 1 }}>
          Go to home
        </Button>
      </Stack>
    </Box>
  )
}

export default NotFound
