"use client"

import React, { useState } from "react"
import { TextField, Typography, Box, InputAdornment } from "@mui/material"
import { AxiosInstance, CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { Email } from "@/assets/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { useRouter } from "next/navigation"

const forgetSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
})

const page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = { email: data.email }
    try {
      const { data } = await AxiosInstance.post(
        "/auth/forgot-password",
        payload,
      )
      dispatch(showToast({ message: data.message, type: "success" }))
      console.log("🚀 ~ onSubmit ~ data:", data)
      router.push("/reset-password")
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
        Forget Password
      </Typography>
      <Typography variant="body2" textAlign="center" mb={2}>
        Enter your registered email to receive an OTP for password reset.
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
      <CustomButton
        text="Send OTP"
        fullWidth
        type="submit"
        disabled={loading}
      />
    </Box>
  )
}

export default page
