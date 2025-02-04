"use client"

import {
  Box,
  Container,
  Grid2,
  TextField,
  Typography,
  Autocomplete,
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
    console.log("🚀 ~ onSubmit ~ data:", data)
    const payload = {
      name: data.name,
      email: data.email,
      phone_no: data.phone_no,
      doctor_id: data.doctor_id,
    }

    setLoading(true)
    try {
      const { data } = await AxiosInstance.post("patient/add", payload)
      dispatch(showToast({ message: data.message, type: "success" }))
      router.push("/admin/patients")
    } catch (error) {
      console.error("Error ceating patient details:", error)
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
              Doctor
            </Typography>
            <Controller
              name="doctor_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={doctors}
                  getOptionLabel={(option) => option.first_name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) => field.onChange(value?.id || "")}
                  value={doctors.find((doc) => doc.id === field.value) || null}
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
