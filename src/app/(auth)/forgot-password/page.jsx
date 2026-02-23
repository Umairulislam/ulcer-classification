"use client"

import React, { useState } from "react"
import { TextField, Typography, Box, InputAdornment } from "@mui/material"
import { CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { Email } from "@/assets/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { useRouter } from "next/navigation"
import { forgotPassword } from "@/services/auth"
import { handleApiError } from "@/services/apiErrorHandler"

const forgetSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
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
      const data = await forgotPassword(payload)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/reset-password")
    } catch (error) {
      handleApiError(error, dispatch, setError)
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
      <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
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
      <CustomButton text="Send OTP" fullWidth type="submit" disabled={loading} />
    </Box>
  )
}

export default page
