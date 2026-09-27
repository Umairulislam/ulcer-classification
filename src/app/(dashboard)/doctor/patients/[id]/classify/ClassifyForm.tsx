"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Paper,
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  Skeleton,
  Divider,
} from "@mui/material"
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import { useGetPatientByIdQuery, useClassifyPatientMutation } from "@/features/patient/patientApi"
import { getErrorMessage } from "@/utils/getErrorMessage"

interface ClassifyFormProps {
  patientId: string
}

const ALLOWED_TYPES = ["image/jpeg", "image/jpg"]
const MAX_FILE_SIZE_MB = 10

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={500}>
      {value}
    </Typography>
  </Box>
)

const ClassifyForm = ({ patientId }: ClassifyFormProps) => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data: patient,
    isLoading: isLoadingPatient,
    isError: isLoadPatientError,
  } = useGetPatientByIdQuery(patientId)

  const [classifyPatient, { isLoading: isUploading, isError, error }] = useClassifyPatientMutation()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  // Revoke the preview URL whenever it changes or the component unmounts
  // — otherwise each new selection leaks the previous object URL.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only JPEG/JPG images are allowed."
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`
    }
    return null
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      setFileError(validationError)
      setSelectedFile(null)
      setPreviewUrl(null)
      return
    }

    setFileError(null)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    // Allow re-selecting the same file later after clearing it.
    event.target.value = ""
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setFileError(null)
  }

  const handleSubmit = async () => {
    if (!selectedFile) return
    try {
      await classifyPatient({ id: patientId, image: selectedFile }).unwrap()
      router.push("/doctor/patients")
    } catch {
      // isError/error below drives the Alert.
    }
  }

  if (isLoadingPatient) {
    return (
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="80%" height={28} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    )
  }

  if (isLoadPatientError || !patient) {
    return (
      <Alert severity="error">
        Couldn&apos;t load this patient&apos;s details. Please go back and try again.
      </Alert>
    )
  }

  return (
    <Stack spacing={2.5}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          Patient details
        </Typography>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InfoField label="Patient ID" value={patient.patient_id} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InfoField label="Name" value={patient.name} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InfoField label="Email" value={patient.email} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InfoField label="Phone" value={patient.phone_no} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InfoField label="Age" value={patient.age} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <InfoField
              label="Gender"
              value={patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          Upload ulcer image
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ mb: 2.5 }}>
            {getErrorMessage(error, "Couldn't upload the image. Please try again.")}
          </Alert>
        )}
        {fileError && (
          <Alert severity="error" sx={{ mb: 2.5 }}>
            {fileError}
          </Alert>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {previewUrl ? (
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2.5 }}>
            <Box
              sx={{
                position: "relative",
                width: 160,
                height: 160,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Selected ulcer image preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                size="small"
                onClick={handleClearFile}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {selectedFile?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ""}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Button
            variant="outlined"
            startIcon={<UploadFileOutlinedIcon />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ mb: 2.5 }}
          >
            Choose image
          </Button>
        )}

        <Divider sx={{ mb: 2.5 }} />

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => router.push("/doctor/patients")}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!selectedFile || isUploading}
            onClick={handleSubmit}
          >
            {isUploading ? "Uploading…" : "Upload & classify"}
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default ClassifyForm
