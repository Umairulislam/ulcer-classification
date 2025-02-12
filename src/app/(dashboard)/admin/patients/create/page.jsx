"use client"

import {
  Box,
  Container,
  Grid2,
  TextField,
  Typography,
  Autocomplete,
  MenuItem,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { AxiosInstance, CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { patientSchema } from "@/schemas"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"

const page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState([])

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema(false)),
    defaultValues: {
      name: "",
      email: "",
      phone_no: "",
      doctor_id: null,
    },
  })

  const getDoctors = async () => {
    setLoading(true)
    try {
      let path = `doctor/all?page=1&perPage=100`
      const { data } = await AxiosInstance.get(path)
      setDoctors(data?.response?.details)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      phone_no: data.phone_no,
      age: data.age,
      gender: data.gender,
      doctor_id: data.doctor_id?.id,
    }

    if (data.email) {
      payload.email = data.email
    }

    setLoading(true)
    try {
      const { data } = await AxiosInstance.post("patient/add", payload)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/admin/patients")
    } catch (error) {
      const { data, status } = error?.response || {}

      if (status === 400 || status === 404) {
        dispatch(showToast({ message: data.message, type: "error" }))
      } else if (status === 422) {
        Object.keys(data).forEach((field) => {
          setError(field, {
            type: "manual",
            message: data[field],
          })
        })
      } else if (status === 500) {
        dispatch(
          showToast({
            message: "Server error. Please try again later.",
            type: "error",
          }),
        )
      } else {
        dispatch(
          showToast({
            message: "Something went wrong. Please try again.",
            type: "error",
          }),
        )
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Create Patient
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", marginTop: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid2 container spacing={2} mb={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Name
            </Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter Name (only alphabets)"
                  variant="outlined"
                  fullWidth
                  error={errors.name}
                  helperText={errors.name?.message}
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
              Age
            </Typography>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  placeholder="e.g., 20"
                  variant="outlined"
                  fullWidth
                  error={errors.age}
                  helperText={errors.age?.message}
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
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Doctor
            </Typography>
            <Controller
              name="doctor_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={doctors}
                  getOptionLabel={(option) =>
                    `${option.first_name} ${option.last_name}`
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) => field.onChange(value)}
                  value={field.value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select Doctor"
                      error={errors.doctor_id}
                      helperText={errors.doctor_id?.message}
                    />
                  )}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <CustomButton
          text={!loading ? "Submit" : "Submitting"}
          disabled={loading}
          type="submit"
        />
      </Box>
    </Container>
  )
}

export default page
