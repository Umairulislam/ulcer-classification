"use client"

import React, { useState } from "react"
import { TextField, Typography, Box, InputAdornment } from "@mui/material"
import { CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { Email } from "@/assets/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { useRouter } from "next/navigation"
import { forgotPassword } from "@/services/auth"
import { handleApiError } from "@/services/apiErrorHandler"
import z from "zod"
import { AppDispatch } from "@/store/store"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (formData: ForgotPasswordFormValues): Promise<void> => {
    setLoading(true)
    try {
      const response = await forgotPassword({ email: formData.email })
      dispatch(showToast({ message: response.message, type: "success" }))
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
            error={!!errors.email}
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

export default ForgotPasswordPage
