"use client"

import { useEffect } from "react"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paper, Grid, TextField, MenuItem, Button, Stack, Alert } from "@mui/material"
import { getDoctorSchema, type DoctorFormValues } from "@/features/doctor/doctor.schema"
import { useUpdateDoctorMutation } from "@/features/doctor/doctorApi"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCurrentUser, setUser } from "@/features/auth/authSlice"
import { getErrorMessage } from "@/utils/getErrorMessage"

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
] as const

const ProfileForm = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  const [updateDoctor, { isLoading: isSaving, isError, error, isSuccess }] =
    useUpdateDoctorMutation()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(getDoctorSchema("edit")) as Resolver<DoctorFormValues>,
    defaultValues: {
      first_name: currentUser?.first_name ?? "",
      last_name: currentUser?.last_name ?? "",
      email: currentUser?.email ?? "",
      phone_no: currentUser?.phone_no ?? "",
      gender: (currentUser?.gender as DoctorFormValues["gender"]) ?? "male",
    },
  })

  // Redux (populated by /me on app load) is the source of truth here —
  // no separate fetch needed. Just resync the form if the user object
  // itself ever changes underneath it.
  useEffect(() => {
    if (currentUser) {
      reset({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        phone_no: currentUser.phone_no,
        gender: currentUser.gender as DoctorFormValues["gender"],
      })
    }
  }, [currentUser, reset])

  const onSubmit = async (values: DoctorFormValues) => {
    if (!currentUser) return
    try {
      const { password: _password, ...updatePayload } = values
      await updateDoctor({ id: currentUser.id, data: updatePayload }).unwrap()
      dispatch(setUser({ ...currentUser, ...updatePayload }))
    } catch {
      // isError/error below drives the Alert.
    }
  }

  if (!currentUser) return null

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ p: 3, maxWidth: 640 }}
    >
      <Stack spacing={2.5}>
        {isError && (
          <Alert severity="error">
            {getErrorMessage(error, "Couldn't save changes. Please try again.")}
          </Alert>
        )}
        {isSuccess && <Alert severity="success">Profile updated successfully.</Alert>}

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
              disabled
              {...register("email")}
              helperText="Email cannot be changed"
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
        </Grid>

        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save changes"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default ProfileForm
