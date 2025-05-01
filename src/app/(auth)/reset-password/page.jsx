"use client"

import React, { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { AxiosInstance, CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { Email, Lock, Visibility, VisibilityOff, VpnKey } from "@/assets/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { resetSchema } from "@/schemas"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: {
      otp_code: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = {
      email: data.email,
      otp_code: data.otp_code,
      password: data.password,
    }
    try {
      const { data } = await AxiosInstance.post("/auth/reset-password", payload)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/login")
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Reset Password
      </Typography>
      <Typography variant="body2" textAlign="center" mb={2}>
        Enter the OTP sent to your email, along with your new password.
      </Typography>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            placeholder="Enter your email"
            fullWidth
            error={errors.email}
            helperText={errors.email?.message}
            sx={{ marginBottom: "12px" }}
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
      <Controller
        name="otp_code"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="otp"
            placeholder="Enter the OTP sent to your email"
            fullWidth
            error={errors.otp_code}
            helperText={errors.otp_code?.message}
            sx={{ marginBottom: "12px" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

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
            sx={{ marginBottom: "12px" }}
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
      <Controller
        name="confirm_password"
        control={control}
        render={({ field }) => (
          <TextField
            label="Confirm Password"
            placeholder="Confirm your password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            {...field}
            error={errors.confirm_password}
            helperText={errors.confirm_password?.message}
            sx={{ marginBottom: "12px" }}
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
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <CustomButton text="Reset" fullWidth type="submit" disabled={loading} />
    </Box>
  )
}

export default page
