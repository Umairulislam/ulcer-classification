"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paper, Grid, TextField, MenuItem, Button, Stack, Alert, Skeleton } from "@mui/material"
import {
  getDoctorSchema,
  type DoctorFormValues,
  type DoctorFormMode,
} from "@/features/doctor/doctor.schema"
import {
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
} from "@/features/doctor/doctorApi"
import { getErrorMessage } from "@/utils/getErrorMessage"

interface DoctorFormProps {
  mode: DoctorFormMode
  // Required when mode === "edit", ignored otherwise.
  doctorId?: string
}

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const

const DoctorForm = ({ mode, doctorId }: DoctorFormProps) => {
  const router = useRouter()
  const isEdit = mode === "edit"

  const {
    data: existingDoctor,
    isLoading: isLoadingDoctor,
    isError: isLoadDoctorError,
  } = useGetDoctorByIdQuery(doctorId ?? "", { skip: !isEdit || !doctorId })
  console.log("🚀 ~ DoctorForm ~ existingDoctor:", existingDoctor)

  const [createDoctor, { isLoading: isCreating, isError: isCreateError, error: createError }] =
    useCreateDoctorMutation()
  const [updateDoctor, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
    useUpdateDoctorMutation()

  const isSubmitting = isCreating || isUpdating
  const isMutationError = isCreateError || isUpdateError
  const mutationError = createError ?? updateError

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(getDoctorSchema(mode)) as Resolver<DoctorFormValues>,
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      gender: "female",
      password: "",
    },
  })

  useEffect(() => {
    if (existingDoctor) {
      reset({
        first_name: existingDoctor.first_name,
        last_name: existingDoctor.last_name,
        email: existingDoctor.email,
        phone_no: existingDoctor.phone_no,
        gender: existingDoctor.gender as DoctorFormValues["gender"],
      })
    }
  }, [existingDoctor, reset])

  const onSubmit = async (values: DoctorFormValues) => {
    try {
      if (isEdit && doctorId) {
        const { password: _password, ...updatePayload } = values
        await updateDoctor({ id: doctorId, data: updatePayload }).unwrap()
      } else {
        await createDoctor(values as Required<DoctorFormValues>).unwrap()
      }
      router.push("/admin/doctors")
    } catch {
      // isMutationError/mutationError below drives the Alert.
    }
  }

  // Edit mode, still fetching the doctor to pre-fill — show placeholders
  // instead of an empty form that then jumps once data arrives.
  if (isEdit && isLoadingDoctor) {
    return (
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="rounded" height={56} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    )
  }

  if (isEdit && isLoadDoctorError) {
    return (
      <Alert severity="error">
        Couldn&apos;t load this doctor&apos;s details. Please go back and try again.
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
                : "Couldn't create doctor. Please try again."
            )}
          </Alert>
        )}

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="First name"
              fullWidth
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Last name"
              fullWidth
              {...register("last_name")}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              disabled={isEdit}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message ?? (isEdit ? "Email cannot be changed" : undefined)}
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

          {!isEdit && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                autoComplete="new-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          )}
        </Grid>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => router.push("/admin/doctors")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Create doctor"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default DoctorForm
