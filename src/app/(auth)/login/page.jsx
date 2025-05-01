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
import { Email, Visibility, VisibilityOff, Lock } from "@/assets/icons"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/schemas"
import { AxiosInstance } from "@/components"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice"
import Link from "next/link"
import { showToast } from "@/store/toastSlice"
import { createCookie } from "@/helpers/cookie"

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    handleSubmit,
    control,
    setError,
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
      const { data } = await AxiosInstance.post("auth/login", payload)
      const accessToken = data?.response?.extra?.access_token
      const role = data?.response?.details?.role

      await createCookie(JSON.stringify(accessToken))
      localStorage.setItem("accessToken", accessToken)

      dispatch(setUser(data?.response?.details))
      dispatch(showToast({ message: data.message, type: "success" }))

      if (role === "admin") {
        return router.push("/admin/dashboard")
      }
      if (role === "doctor") {
        return router.push("/doctor/dashboard")
      }
    } catch (error) {
      const { data, status } = error?.response || {}

      if (status === 400 || status === 404) {
        dispatch(showToast({ message: data.message, type: "error" }))
      } else if (status === 422) {
        Object.keys(data).forEach((field) => {
          setError(field, {
            type: "manual",
            message: data[field],
          })
        })
      } else if (status === 500) {
        dispatch(
          showToast({
            message: "Server error. Please try again later.",
            type: "error",
          }),
        )
      } else {
        dispatch(
          showToast({
            message: "Something went wrong. Please try again.",
            type: "error",
          }),
        )
      }
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
        color: "primary.main",
        padding: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
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
              color: "primary.main",
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
            color="primary.main"
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
              backgroundColor: "primary.main",
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
                color: "primary.main",
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
