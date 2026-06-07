"use client"

import { Lock, VisibilityOff, Visibility } from "@/assets/icons"
import { CustomButton } from "@/components"
import { updatePassword } from "@/services/shared"
import { UpdatePassFormValues, updatePassSchema } from "@/schemas/updatePassSchema"
import { AppDispatch } from "@/store/store"
import { showToast } from "@/store/toastSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { handleApiError } from "@/services/apiErrorHandler"

const UpdatePasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.split("/")[1]
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UpdatePassFormValues>({
    resolver: zodResolver(updatePassSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  })

  const onSubmit = async (formData: UpdatePassFormValues) => {
    setLoading(true)
    try {
      const response = await updatePassword(formData)
      dispatch(showToast({ message: response?.message, type: "success" }))
      router.push(`/${basePath}/dashboard`)
    } catch (error) {
      handleApiError(error, dispatch, setError)
    } finally {
      setLoading(false)
    }
  }

  const passwordAdornments = {
    startAdornment: (
      <InputAdornment position="start">
        <Lock />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword((prev) => !prev)}
          edge="end"
          aria-label="toggle password visibility"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Update Password
      </Typography>
      <Box component="form" sx={{ width: "100%", marginTop: 4 }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Old Password
            </Typography>
            <Controller
              name="current_password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Old Password"
                  placeholder="Enter your old password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.current_password}
                  helperText={errors.current_password?.message}
                  slotProps={{ input: passwordAdornments }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              New Password
            </Typography>
            <Controller
              name="new_password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Password"
                  placeholder="Enter your new password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.new_password}
                  helperText={errors.new_password?.message}
                  slotProps={{ input: passwordAdornments }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Confirm Password
            </Typography>
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password?.message}
                  slotProps={{ input: passwordAdornments }}
                />
              )}
            />
          </Grid>
        </Grid>
        <CustomButton text={loading ? "Updating..." : "Update"} disabled={loading} type="submit" />
      </Box>
    </Container>
  )
}

export default UpdatePasswordPage
