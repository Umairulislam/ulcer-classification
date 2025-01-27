"use client"

import {
  Box,
  Container,
  Grid2,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@/assets/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import doctorSchema from "../../create/doctorSchema"
import { useEffect, useState } from "react"
import { AxiosInstance, CustomButton } from "@/components"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"

const page = () => {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { id } = params
  const isUpdate = Boolean(id)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(doctorSchema(isUpdate)),
  })

  const fetchDoctor = async () => {
    setLoading(true)
    try {
      const { data } = await AxiosInstance.get(`doctor/${id}`)
      // Populate form fields with the fetched data
      reset(data?.response?.details)
    } catch (error) {
      console.error("Error fetching doctor details:", error)
    } finally {
      setLoading(false)
    }
  }

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
      const { data } = await AxiosInstance.patch(`doctor/update/${id}`, payload)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/admin/doctors")
    } catch (error) {
      console.error("Error updating doctor details:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctor()
  }, [id, reset])

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Update Doctor
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", marginTop: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
          </Grid2>
          <CustomButton
            text={!loading ? "Update" : "Updating"}
            disabled={loading}
            type="submit"
          />
        </Grid2>
      </Box>
    </Container>
  )
}

export default page
