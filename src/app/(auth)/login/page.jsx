"use client"

import React, { useState } from "react"
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { Email, Visibility, VisibilityOff, Lock } from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "./loginSchema"
import { AxiosInstance, Toast } from "@/components"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice"
import Link from "next/link"

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "error",
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleCloseToast = () => {
    setToast({ ...toast, open: false })
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = {
      email: data.email,
      password: data.password,
    }

    try {
      const { data } = await AxiosInstance.post("doctor/login", payload)
      console.log("🚀 ~ onSubmit ~ data:", data)

      const accessToken = data?.response?.extra?.access_token
      localStorage.setItem("accessToken", accessToken)
      dispatch(setUser(data?.response?.details))

      setToast({
        open: true,
        message: data.message,
        severity: "success",
      })

      const role = data?.response?.details?.role
      if (role === "admin") {
        return router.push("/admin/dashboard")
      }
      if (role === "doctor") {
        return router.push("/doctor/dashboard")
      }
    } catch (error) {
      if (error.status === 400) {
        setToast({
          open: true,
          message: error.response.data.message,
          severity: "error",
        })
      }
      console.log("🚀 ~ onSubmit ~ error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "#00A9FF",
        padding: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#00A9FF",
              mb: 1,
            }}
          >
            Login to Your Account
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Enter your email and password to access the dashboard.
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                type="email"
                fullWidth
                {...field}
                error={errors.email}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                {...field}
                error={errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="#00A9FF"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              mt: 2,
              textTransform: "capitalize",
              fontSize: "1rem",
              paddingY: 1.5,
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#00A9FF",
            }}
          >
            Log In
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Forgot your password?{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "#00A9FF",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              <Link href="forget-password">Reset it here</Link>
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage
