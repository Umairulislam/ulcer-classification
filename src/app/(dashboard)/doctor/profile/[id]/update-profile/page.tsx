"use client"

import { Box, Container, Grid, TextField, Typography, MenuItem } from "@mui/material"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { CustomButton, Loader } from "@/components"
import { useParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { AppDispatch } from "@/store/store"
import { UpdateProfileFormValues, updateProfileSchema } from "@/schemas/updateProfileSchema"
import { getDoctorById } from "@/services/admin"
import { updateProfile } from "@/services/shared"
import { handleApiError } from "@/services/apiErrorHandler"

const UpdateProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const pathname = usePathname()
  const basePath = pathname.split("/")[1]
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      gender: "male",
    },
  })

  const fetchProfile = async (): Promise<void> => {
    setLoading(true)
    try {
      const data = await getDoctorById(id)
      reset(data?.response?.details)
    } catch (error) {
      console.error("Error fetching profile details:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (formData: UpdateProfileFormValues): Promise<void> => {
    setLoading(true)
    try {
      const response = await updateProfile(id, formData)
      dispatch(showToast({ message: response.message, type: "success" }))
      router.push(`/${basePath}/dashboard`)
    } catch (error) {
      handleApiError(error, dispatch, setError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [id])

  if (loading) return <Loader />

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Update Profile
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
                  disabled
                  error={!!errors.email}
                  helperText={errors.email?.message}
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

export default UpdateProfilePage
