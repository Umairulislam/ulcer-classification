"use client"

import { Paper, Stack, TextField, InputAdornment, MenuItem } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useGetAllDoctorsQuery } from "@/features/doctor/doctorApi"

interface PatientFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  // "all" means no doctor filter applied. Both are optional/ignored when
  // showDoctorFilter is false (a doctor viewing only their own patients
  // has nothing to filter by doctor — the backend already scopes results
  // to them).
  doctorId?: string
  onDoctorIdChange?: (value: string) => void
  showDoctorFilter?: boolean
}

const PatientFilters = ({
  search,
  onSearchChange,
  doctorId,
  onDoctorIdChange,
  showDoctorFilter = true,
}: PatientFiltersProps) => {
  // Only fetch the doctor list when the dropdown is actually shown —
  // no point making this request on the doctor's own patients page.
  const { data, isLoading } = useGetAllDoctorsQuery({ perPage: 100 }, { skip: !showDoctorFilter })
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

        {showDoctorFilter && (
          <TextField
            select
            label="Doctor"
            value={doctorId ?? "all"}
            onChange={(e) => onDoctorIdChange?.(e.target.value)}
            disabled={isLoading}
            sx={{ minWidth: { xs: "100%", sm: 220 } }}
          >
            <MenuItem value="all">All doctors</MenuItem>
            {doctors.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                Dr. {doctor.first_name} {doctor.last_name}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Stack>
    </Paper>
  )
}

export default PatientFilters
