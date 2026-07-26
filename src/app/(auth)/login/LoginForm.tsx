"use client"

import { LoginFormValues, loginSchema } from "@/features/auth/auth.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginMutation } from "@/features/auth/authApi"
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const DASHBOARD_BY_ROLE: Record<string, string> = {
  admin: "/admin/dashboard",
  doctor: "/doctor/dashboard",
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: { message?: string } }).data
    if (data?.message) return data.message
  }
  return "Invalid email or password. Please try again."
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [login, { isLoading, isError, error }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { user } = await login(values).unwrap()

      const redirectTo = searchParams.get("redirect")
      const ownDashboard = DASHBOARD_BY_ROLE[user.role] ?? "/login"

      const isRedirectSafe = !!redirectTo && redirectTo.startsWith(`/${user.role}`)

      router.replace(isRedirectSafe ? redirectTo : ownDashboard)
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
          <Typography variant="h4">Welcome back</Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to the Ulcer Classification System
          </Typography>
        </Stack>

        <Stack spacing={3}>
          {isError && <Alert severity="error">{getErrorMessage(error)}</Alert>}

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
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Stack direction="column" justifyContent="center" gap={1}>
            <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>

            <Button component={Link} href="/forgot-password" size="small">
              Forgot password?
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default LoginForm
