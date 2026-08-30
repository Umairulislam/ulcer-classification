"use client"

import { Paper, Stack, TextField, InputAdornment, MenuItem } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useGetAllDoctorsQuery } from "@/features/doctor/doctorApi"

interface PatientFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  // "" means no doctor filter applied (all doctors).
  doctorId: string
  onDoctorIdChange: (value: string) => void
}

const PatientFilters = ({
  search,
  onSearchChange,
  doctorId,
  onDoctorIdChange,
}: PatientFiltersProps) => {
  // Assumes doctor count stays under 100 — fine for a dropdown today, but
  // if the doctor list grows large this should become a searchable
  // autocomplete backed by the same search param instead of one big fetch.
  const { data, isLoading } = useGetAllDoctorsQuery({ perPage: 100 })
  const doctors = data?.doctors ?? []

  return (
    <Paper sx={{ p: 2, mb: 2.5 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          placeholder="Search by patient name or email"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          label="Doctor"
          value={doctorId}
          onChange={(e) => onDoctorIdChange(e.target.value)}
          disabled={isLoading}
          sx={{ minWidth: { xs: "100%", sm: 220 } }}
        >
          <MenuItem value="">All doctors</MenuItem>
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              Dr. {doctor.first_name} {doctor.last_name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Paper>
  )
}

export default PatientFilters
