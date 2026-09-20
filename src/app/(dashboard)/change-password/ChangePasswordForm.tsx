"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paper, Grid, TextField, Button, Stack, Alert } from "@mui/material"
import { changePasswordSchema, type ChangePasswordFormValues } from "@/features/auth/auth.schema"
import { useChangePasswordMutation } from "@/features/auth/authApi"
import { getErrorMessage } from "@/utils/getErrorMessage"

const ChangePasswordForm = () => {
  const [changePassword, { isLoading, isError, error, isSuccess }] = useChangePasswordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      await changePassword(values).unwrap()
      reset()
    } catch {
      // isError/error below drives the Alert.
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ p: 3, maxWidth: 480 }}
    >
      <Stack spacing={2.5}>
        {isError && (
          <Alert severity="error">
            {getErrorMessage(error, "Couldn't change your password. Please try again.")}
          </Alert>
        )}
        {isSuccess && <Alert severity="success">Password changed successfully.</Alert>}

        <Grid container spacing={2.5}>
          <Grid size={12}>
            <TextField
              label="Current password"
              type="password"
              fullWidth
              autoComplete="current-password"
              {...register("current_password")}
              error={!!errors.current_password}
              helperText={errors.current_password?.message}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="New password"
              type="password"
              fullWidth
              autoComplete="new-password"
              {...register("new_password")}
              error={!!errors.new_password}
              helperText={errors.new_password?.message}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Confirm new password"
              type="password"
              fullWidth
              autoComplete="new-password"
              {...register("confirm_password")}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Saving…" : "Change password"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default ChangePasswordForm
