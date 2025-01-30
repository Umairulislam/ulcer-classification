"use client"

import { Lock, VisibilityOff, Visibility } from "@/assets/icons"
import { CustomButton } from "@/components"
import { updatePassSchema } from "@/schemas"
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
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

const page = () => {
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
      old_password: data.old_password,
      password: data.password,
      confirm_password: data.confirm_password,
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
              name="old_password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Old Password"
                  placeholder="Enter your old password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...field}
                  error={errors.old_password}
                  helperText={errors.old_password?.message}
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
