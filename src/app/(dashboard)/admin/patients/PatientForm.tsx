"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paper, Grid, TextField, MenuItem, Button, Stack, Alert, Skeleton } from "@mui/material"
import { patientSchema, type PatientFormValues } from "@/features/patient/patient.schema"
import {
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from "@/features/patient/patientApi"
import { useGetAllDoctorsQuery } from "@/features/doctor/doctorApi"
import { getErrorMessage } from "@/utils/getErrorMessage"

interface PatientFormProps {
  mode: "create" | "edit"
  // Required when mode === "edit", ignored otherwise.
  patientId?: string
}

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const

const PatientForm = ({ mode, patientId }: PatientFormProps) => {
  const router = useRouter()
  const isEdit = mode === "edit"

  const {
    data: existingPatient,
    isLoading: isLoadingPatient,
    isError: isLoadPatientError,
  } = useGetPatientByIdQuery(patientId ?? "", { skip: !isEdit || !patientId })

  // Reused from the Patients list filter — same 100-doctor assumption
  // applies here (see PatientFilters.tsx comment).
  const { data: doctorsData, isLoading: isLoadingDoctors } = useGetAllDoctorsQuery({
    perPage: 100,
  })
  const doctors = doctorsData?.doctors ?? []

  const [createPatient, { isLoading: isCreating, isError: isCreateError, error: createError }] =
    useCreatePatientMutation()
  const [updatePatient, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
    useUpdatePatientMutation()

  const isSubmitting = isCreating || isUpdating
  const isMutationError = isCreateError || isUpdateError
  const mutationError = createError ?? updateError

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_no: "",
      age: "",
      gender: "male",
      doctor_id: "",
    },
  })

  // Once the existing patient's data arrives (edit mode only), populate
  // the form — doctor_id comes from the nested `user` object (the
  // assigned doctor), not a top-level field on the patient record.
  useEffect(() => {
    if (existingPatient) {
      reset({
        name: existingPatient.name,
        email: existingPatient.email,
        phone_no: existingPatient.phone_no,
        age: existingPatient.age,
        gender: existingPatient.gender as PatientFormValues["gender"],
        doctor_id: existingPatient.user.id,
      })
    }
  }, [existingPatient, reset])

  const onSubmit = async (values: PatientFormValues) => {
    try {
      if (isEdit && patientId) {
        await updatePatient({ id: patientId, data: values }).unwrap()
      } else {
        await createPatient(values).unwrap()
      }
      router.push("/admin/patients")
    } catch {
      // isMutationError/mutationError below drives the Alert.
    }
  }

  // Edit mode, still fetching the patient to pre-fill — show placeholders
  // instead of an empty form that then jumps once data arrives.
  if (isEdit && isLoadingPatient) {
    return (
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="rounded" height={56} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    )
  }

  if (isEdit && isLoadPatientError) {
    return (
      <Alert severity="error">
        Couldn&apos;t load this patient&apos;s details. Please go back and try again.
      </Alert>
    )
  }

  return (
    <Paper component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ p: 3 }}>
      <Stack spacing={2.5}>
        {isMutationError && (
          <Alert severity="error">
            {getErrorMessage(
              mutationError,
              isEdit
                ? "Couldn't save changes. Please try again."
                : "Couldn't create patient. Please try again."
            )}
          </Alert>
        )}

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Full name"
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Phone number"
              fullWidth
              {...register("phone_no")}
              error={!!errors.phone_no}
              helperText={errors.phone_no?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Age"
              fullWidth
              {...register("age")}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            {/* Controller, not register — same MUI Select value-sync issue
                we fixed on the Doctor form's gender field applies here too. */}
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
                  {GENDER_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="doctor_id"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Assigned doctor"
                  fullWidth
                  disabled={isLoadingDoctors}
                  error={!!errors.doctor_id}
                  helperText={errors.doctor_id?.message}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      Dr. {doctor.first_name} {doctor.last_name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => router.push("/admin/patients")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Create patient"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default PatientForm
