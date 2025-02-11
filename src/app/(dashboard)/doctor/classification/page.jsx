"use client"

import React, { useEffect, useState } from "react"
import {
  Container,
  Box,
  Typography,
  Grid2,
  TextField,
  Button,
  Avatar,
  Autocomplete,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { AxiosInstance } from "@/components"

// Yup schema for classification form
const classificationSchema = yup.object({
  patient_id: yup
    .object()
    .nullable()
    .required("Patient is required")
    .test(
      "is-valid-patient",
      "Please select a valid patient",
      (value) => !!value && typeof value === "object" && !!value.id,
    ),

  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Only jpg, jpeg, and png files are allowed", (value) => {
      if (!value || value.length === 0) return false
      const file = value[0]
      return ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
    }),
})

const ClassificationPage = () => {
  // State to hold preview image URL
  const [preview, setPreview] = useState(null)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  // Set up the form with react-hook-form and yup resolver
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(classificationSchema),
    defaultValues: {
      patient_name: "",
      image: null,
    },
  })

  const getPatients = async () => {
    setLoading(true)
    try {
      let path = `patient/all?page=1&perPage=100`
      const { data } = await AxiosInstance.get(path)
      setPatients(data?.response?.details)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle file change: update the form value and create an image preview URL
  const handleImageChange = (e) => {
    const fileList = e.target.files
    setValue("image", fileList) // Save the FileList in the form state
    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    } else {
      setPreview(null)
    }
  }

  // When form is submitted, log the form data (API integration to be added later)
  const onSubmit = (data) => {
    console.log("Form submitted:", data.image[0])
    const payload = {
      image: data.image[0],
      patient_id: data.patient_id.id,
    }

    setLoading(true)
    try {
      const response = AxiosInstance.post(
        `patient/classify/upload/${data.patient_id.id}`,
        payload,
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPatients()
  }, [])

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="left" fontWeight="bold" gutterBottom>
        Ulcer Classification
      </Typography>
      <Box
        component="form"
        maxWidth="sm"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          margin: "0 auto",
          p: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "background.paper",
        }}
      >
        <Grid2 container spacing={2}>
          {/* Patient Name Field */}
          <Grid2 size={{ xs: 12 }}>
            <Controller
              name="patient_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={patients}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) => field.onChange(value)}
                  value={field.value || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select Patient"
                      error={errors.patient_id}
                      helperText={errors.patient_id?.message}
                    />
                  )}
                />
              )}
            />
          </Grid2>

          {/* Image Upload Field */}
          <Grid2 size={{ xs: 12 }}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ color: "white", textTransform: "none" }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleImageChange}
              />
            </Button>
            {errors.image && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.image.message}
              </Typography>
            )}
          </Grid2>

          {/* Image Preview */}
          {preview && (
            <Grid2 size={{ xs: 12 }} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Preview:</Typography>
              <Avatar
                variant="rounded"
                src={preview}
                sx={{ width: 200, height: 200, mx: "auto", mt: 2 }}
              />
            </Grid2>
          )}

          {/* Submit Button */}
          <Grid2 size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ color: "white", textTransform: "none" }}
              disabled={loading}
            >
              Classify Ulcer
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  )
}

export default ClassificationPage
