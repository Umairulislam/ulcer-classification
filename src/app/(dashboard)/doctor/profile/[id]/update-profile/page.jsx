"use client"

import {
  Box,
  Container,
  Grid2,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { updateProfileSchema } from "@/schemas"
import { useEffect, useState } from "react"
import { AxiosInstance, CustomButton } from "@/components"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { showToast } from "@/store/toastSlice"

const page = () => {
  const params = useParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = params
  const { user } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      gender: "",
    },
  })

  const fetchDoctor = async () => {
    setLoading(true)
    try {
      const { data } = await AxiosInstance.get(`doctor/${user?.id}`)
      // Populate form fields with the fetched data
      reset(data?.response?.details)
    } catch (error) {
      console.error("Error fetching doctor details:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_no: data.phone_no,
      gender: data.gender,
    }

    setLoading(true)
    try {
      // API to be change
      const { data } = await AxiosInstance.patch(`doctor/update/${id}`, payload)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error updating admin profile", error)
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
        Update Profile
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", marginTop: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 container spacing={2} mb={2}>
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
