"use client"

import { ResetPasswordFormValues, resetPasswordSchema } from "@/features/auth/auth.schema"
import { useResetPasswordMutation } from "@/features/auth/authApi"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

const ResetPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromQuery = searchParams.get("email") ?? ""

  const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: emailFromQuery, otp_code: "", password: "", confirmPassword: "" },
  })

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const { confirmPassword: _confirmPassword, ...payload } = values
      await resetPassword(payload).unwrap()
      router.push("/login")
    } catch {}
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ width: "100%", maxWidth: 400, p: 4 }}
      >
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h4">Reset password</Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the OTP sent to your email and choose a new password.
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          {isError && (
            <Alert severity="error">
              {getErrorMessage(error, "Couldn't reset your password. Please try again.")}
            </Alert>
          )}

          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="OTP code"
            autoComplete="one-time-code"
            fullWidth
            {...register("otp_code")}
            error={!!errors.otp_code}
            helperText={errors.otp_code?.message}
          />

          <TextField
            label="New password"
            type="password"
            autoComplete="new-password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
            {isLoading ? "Resetting…" : "Reset password"}
          </Button>

          <Button
            component={Link}
            href="/login"
            size="small"
            sx={{ textTransform: "none", alignSelf: "center" }}
          >
            Back to login
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ResetPasswordForm
