"use client"

import React, { useState, useEffect } from "react"
import { Autocomplete, Box, Container, Grid, MenuItem, TextField, Typography } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { createPatient, getDoctors } from "@/services/admin"
import { handleApiError } from "@/services/apiErrorHandler"
import { CustomButton, Loader } from "@/components"
import { AppDispatch } from "@/store/store"
import { UserRecord } from "@/types/api"
import { PatientFormValues } from "@/schemas"
import { patientSchema } from "@/schemas/patientSchema"

const CreatePatientPage = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState<UserRecord[]>([])

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_no: "",
      age: "" as unknown as number,
      gender: "male",
      doctor_id: { id: "", first_name: "", last_name: "" },
    },
  })

  const fetchDoctors = async (): Promise<void> => {
    setLoading(true)
    try {
      const data = await getDoctors({ page: 1, perPage: 100 })
      setDoctors(data?.response?.details ?? [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (formData: PatientFormValues): Promise<void> => {
    setLoading(true)
    try {
      const payload = {
        ...formData,
        doctor_id: formData.doctor_id?.id,
      }
      const response = await createPatient(payload as unknown as PatientFormValues)
      dispatch(showToast({ message: response.message, type: "success" }))
      router.push("/admin/patients")
    } catch (error) {
      handleApiError(error, dispatch, setError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  if (loading) return <Loader />

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Create Patient
      </Typography>
      <Box component="form" sx={{ width: "100%", marginTop: 4 }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Name
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Age
            </Typography>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="e.g., 20"
                  fullWidth
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Doctor
            </Typography>
            <Controller
              name="doctor_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={doctors}
                  getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(_: unknown, value) => field.onChange(value)}
                  value={field.value?.id ? (field.value as unknown as UserRecord) : null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Doctor"
                      error={!!errors.doctor_id}
                      helperText={errors.doctor_id?.id?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
        <CustomButton
          text={loading ? "Submitting..." : "Submit"}
          disabled={loading}
          type="submit"
        />
      </Box>
    </Container>
  )
}

export default CreatePatientPage
