"use client"

import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material"
import React, { useState } from "react"
import { Visibility, VisibilityOff } from "@/assets/icons"
import { CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { doctorSchema } from "@/schemas"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { createDoctor } from "@/services/admin"
import { handleApiError } from "@/services/apiErrorHandler"

const page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchema(false)),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_no: "",
      gender: "",
    },
  })

  const onSubmit = async (data) => {
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      phone_no: data.phone_no,
      gender: data.gender,
    }

    setLoading(true)
    try {
      const data = await createDoctor(payload)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/admin/doctors")
    } catch (error) {
      handleApiError(error, dispatch, setError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Create Doctor
      </Typography>
      <Box component="form" sx={{ width: "100%", marginTop: 4 }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              First Name
            </Typography>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter first name (only alphabets)"
                  variant="outlined"
                  fullWidth
                  error={errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Last Name
            </Typography>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter last name (only alphabets)"
                  variant="outlined"
                  fullWidth
                  error={errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="e.g., example@domain.com"
                  variant="outlined"
                  type="email"
                  fullWidth
                  error={errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="At least 6 characters"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
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
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Phone Number
            </Typography>
            <Controller
              name="phone_no"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="e.g., +1234567890"
                  variant="outlined"
                  fullWidth
                  error={errors.phone_no}
                  helperText={errors.phone_no?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Gender
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  error={errors.gender}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              )}
            />
          </Grid>
        </Grid>
        <CustomButton text={!loading ? "Submit" : "Submitting"} disabled={loading} type="submit" />
      </Box>
    </Container>
  )
}

export default page
