"use client"

import { Box, Container, Grid2, TextField, Typography, Button, Avatar } from "@mui/material"
import React, { useEffect, useState } from "react"
import { CustomButton } from "@/components"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { classificationSchema } from "@/schemas"
import { useParams, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"
import { apiManager } from "@/helpers/apiManager"
import { getPatientById } from "@/services/admin"
import { classifyUlcer } from "@/services/doctors"
import { handleApiError } from "@/services/apiErrorHandler"

const page = () => {
  const params = useParams()
  const { id } = params
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [patient, setPatient] = useState({})

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(classificationSchema),
  })

  const fetchPatient = async () => {
    setLoading(true)
    try {
      const data = await getPatientById(id)
      setPatient(data?.response?.details)
    } catch (error) {
      console.error("Error fetching patient details:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (formData) => {
    setLoading(true)
    try {
      const data = await classifyUlcer(id, formData.image[0])
      dispatch(showToast({ message: data.message, type: "success" }))

      const pdfUrl = data?.response?.details?.report_url
      if (pdfUrl) {
        window.open(pdfUrl, "_blank") // Opens the PDF in a new tab
      }

      router.push("/doctor/patients")
    } catch (error) {
      handleApiError(error, dispatch, setError)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const fileList = e.target.files
    setValue("image", fileList)
    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    } else {
      setPreview(null)
    }
  }

  useEffect(() => {
    fetchPatient()
  }, [])

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold">
        Patient Classification
      </Typography>
      <Box component="form" sx={{ width: "100%", marginTop: 4 }} onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2} mb={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Name
            </Typography>
            <TextField value={patient?.name ?? ""} variant="outlined" fullWidth disabled />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Email
            </Typography>
            <TextField
              value={patient?.email ?? ""}
              variant="outlined"
              type="email"
              disabled
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Phone Number
            </Typography>
            <TextField value={patient?.phone_no ?? ""} variant="outlined" fullWidth disabled />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Age
            </Typography>
            <TextField
              value={patient?.age ?? ""}
              type="number"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Gender
            </Typography>
            <TextField
              value={patient?.gender ?? ""}
              variant="outlined"
              fullWidth
              disabled
            ></TextField>
          </Grid2>

          {/* Image Upload Field */}
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 6 }}>
            <Typography variant="body1" fontWeight="bold" mb={1}>
              Upload Image
            </Typography>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                color: "white",
                textTransform: "none",
                height: "55px",
              }}
            >
              Select Image
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
        </Grid2>

        {/* Image Preview */}
        {preview && (
          <Grid2 size={{ xs: 12 }} mt={2}>
            <Typography variant="subtitle1">Preview:</Typography>
            <Avatar
              variant="rounded"
              src={preview}
              sx={{ width: 200, height: 200, mx: "auto", mt: 2 }}
            />
          </Grid2>
        )}

        <CustomButton text={!loading ? "Submit" : "Submitting"} disabled={loading} type="submit" />
      </Box>
    </Container>
  )
}

export default page
