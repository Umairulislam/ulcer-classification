"use client"

import { Paper, Stack, TextField, InputAdornment, MenuItem } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import type { DoctorStatus } from "@/features/doctor/types"

interface DoctorFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: DoctorStatus | "all"
  onStatusChange: (value: DoctorStatus | "all") => void
}

const DoctorFilters = ({ search, onSearchChange, status, onStatusChange }: DoctorFiltersProps) => {
  return (
    <Paper sx={{ p: 2, mb: 2.5 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          placeholder="Search by name or email"
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
          label="Status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as DoctorStatus | "all")}
          sx={{ minWidth: { xs: "100%", sm: 180 } }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="deactive">Inactive</MenuItem>
        </TextField>
      </Stack>
    </Paper>
  )
}

export default DoctorFilters
