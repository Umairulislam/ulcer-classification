"use client"

import { Lock, VisibilityOff, Visibility } from "@/assets/icons"
import { AxiosInstance, CustomButton } from "@/components"
import { updatePassSchema } from "@/schemas"
import { showToast } from "@/store/toastSlice"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Container,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

const page = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.split("/")[1]
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    handleSubmit,
    control,
    submit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePassSchema),
  })

  const onSubmit = async (data) => {
    const payload = {
      current_password: data.current_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    }

    setLoading(true)
    try {
      const { data } = await AxiosInstance.post("auth/change-password", payload)
      dispatch(showToast({ message: data?.message, type: "success" }))
      router.push(`/${basePath}/dashboard`)
    } catch (error) {
      console.error("Error updating password:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Update Password
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", marginTop: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 container spacing={2} mb={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Old Password
            </Typography>
            <Controller
              name="current_password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Old Password"
                  placeholder="Enter your old password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...field}
                  error={errors.current_password}
                  helperText={errors.current_password?.message}
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              New Password
            </Typography>
            <Controller
              name="new_password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="New Password"
                  placeholder="Enter your new password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...field}
                  error={errors.new_password}
                  helperText={errors.new_password?.message}
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Confirm Password
            </Typography>
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...field}
                  error={errors.confirm_password}
                  helperText={errors.confirm_password?.message}
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
          </Grid2>
        </Grid2>
        <CustomButton
          text={!loading ? "Update" : "Updating"}
          disabled={loading}
          type="submit"
        />
      </Box>
    </Container>
  )
}

export default page
