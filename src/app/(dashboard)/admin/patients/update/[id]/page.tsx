"use client"

import { Box, Container, Grid, TextField, Typography, Autocomplete, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react"
import { CustomButton, Loader } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { getDoctors, getPatientById, updatePatient } from "@/services/admin"
import { handleApiError } from "@/services/apiErrorHandler"
import { AppDispatch } from "@/store/store"
import { PatientRecord, UserRecord } from "@/types/api"
import { PatientFormValues, patientSchema, UpdatePatientPayload } from "@/schemas/patientSchema"

const UpdatePatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState<UserRecord[]>([])

  const {
    handleSubmit,
    control,
    setValue,
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

  const fetchPatient = async (): Promise<void> => {
    setLoading(true)
    try {
      const data = await getPatientById(id)
      const patient = data?.response?.details as PatientRecord

      // Populate form fields with fetched data
      setValue("name", patient.name)
      setValue("email", patient.email)
      setValue("phone_no", patient.phone_no)
      setValue("age", Number(patient.age))
      setValue("gender", patient.gender)
      setValue("doctor_id", {
        id: patient.user.id,
        first_name: patient.user.first_name,
        last_name: patient.user.last_name ?? "",
      })
    } catch (error) {
      console.error("Error fetching patient details:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctors = async (): Promise<void> => {
    try {
      const data = await getDoctors({ page: 1, perPage: 100 })
      setDoctors(data?.response?.details ?? [])
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (formData: PatientFormValues): Promise<void> => {
    setLoading(true)
    try {
      const payload: UpdatePatientPayload = {
        name: formData.name,
        phone_no: formData.phone_no,
        age: formData.age,
        gender: formData.gender,
        doctor_id: formData.doctor_id?.id,
      }
      if (formData.email) payload.email = formData.email

      const response = await updatePatient(id, payload as Partial<PatientFormValues>)
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

  useEffect(() => {
    fetchPatient()
  }, [id])

  if (loading) return <Loader />

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Update Patient
      </Typography>
      <Box component="form" sx={{ width: "100%", marginTop: 4 }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
                  disabled
                  fullWidth
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Gender
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => {
                return (
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
                )
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
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
                  onChange={(event, value) => field.onChange(value)}
                  value={field.value ?? null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Doctor"
                      error={!!!!errors.doctor_id}
                      helperText={errors.doctor_id?.message}
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

export default UpdatePatientPage
