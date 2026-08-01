"use client"

import { ForgotPasswordFormValues, forgotPasswordSchema } from "@/features/auth/auth.schema"
import { useForgotPasswordMutation } from "@/features/auth/authApi"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const ForgotPasswordForm = () => {
  const router = useRouter()
  const [forgotPassword, { isLoading, isError, error }] = useForgotPasswordMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(values).unwrap()
      router.push(`/reset-password?email=${encodeURIComponent(values.email)}`)
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
          <Typography variant="h4">Forgot password</Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email and we&apos;ll send you an OTP to reset it.
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          {isError && (
            <Alert severity="error">
              {getErrorMessage(error, "Couldn't send the OTP. Please try again.")}
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

          <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
            {isLoading ? "Sending…" : "Send OTP"}
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

export default ForgotPasswordForm
