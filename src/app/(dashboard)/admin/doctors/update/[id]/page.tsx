"use client"

import { Box, Container, Grid, TextField, Typography, MenuItem } from "@mui/material"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { CustomButton } from "@/components"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { handleApiError } from "@/services/apiErrorHandler"
import { getDoctorById, updateDoctor } from "@/services/admin"
import { AppDispatch } from "@/store/store"
import { UpdateDoctorFormValues, updateDoctorSchema } from "@/schemas/doctorSchema"

const UpdateDoctorPage = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<UpdateDoctorFormValues>({
    resolver: zodResolver(updateDoctorSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      gender: "male",
    },
  })

  const fetchDoctor = async (): Promise<void> => {
    setLoading(true)
    try {
      const data = await getDoctorById(id)
      // Populate form fields with the fetched data
      reset(data?.response?.details)
    } catch (error) {
      console.error("Error fetching doctor details:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (formData: UpdateDoctorFormValues): Promise<void> => {
    setLoading(true)
    try {
      const data = await updateDoctor(id, formData)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/admin/doctors")
    } catch (error) {
      handleApiError(error, dispatch, setError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctor()
  }, [id])

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Update Doctor
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
                  placeholder="Enter first name"
                  fullWidth
                  error={!!errors.first_name}
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
                  placeholder="Enter last name"
                  fullWidth
                  error={!!errors.last_name}
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
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled
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
                  fullWidth
                  error={!!errors.phone_no}
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
                  fullWidth
                  error={!!errors.gender}
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
        <CustomButton text={loading ? "Updating..." : "Update"} disabled={loading} type="submit" />
      </Box>
    </Container>
  )
}

export default UpdateDoctorPage
