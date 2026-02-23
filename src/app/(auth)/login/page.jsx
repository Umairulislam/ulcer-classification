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
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice"
import Link from "next/link"
import { showToast } from "@/store/toastSlice"
import { createCookie } from "@/helpers/cookie"
import { apiManager } from "@/helpers/apiManager"
import { handleApiError } from "@/services/apiErrorHandler"
import { login } from "@/services/auth/"

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

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      // 1. Send login request and get response
      const data = await login(formData)

      // 2. Extract token and user details
      const accessToken = data?.response?.extra?.access_token
      const userDetails = data?.response?.details
      const role = userDetails?.role

      // 3. Set the cookie (Server-side helper)
      await createCookie(accessToken)

      // 4. Update Redux state and show success message
      dispatch(setUser(userDetails))
      dispatch(showToast({ message: data.message, type: "success" }))

      // 5. Navigate based on user role
      if (role === "admin") {
        router.push("/admin/dashboard")
      } else if (role === "doctor") {
        router.push("/doctor/dashboard")
      }
    } catch (error) {
      // 6. Pass the error, dispatch, and setError to the helper
      handleApiError(error, dispatch, setError)
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
                {...field}
                label="Email"
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
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
                {...field}
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
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
              <Link href="/forgot-password">Reset it here</Link>
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage
