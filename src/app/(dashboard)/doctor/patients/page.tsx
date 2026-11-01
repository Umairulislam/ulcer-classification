"use client"

import { useState } from "react"
import Link from "next/link"
import { Box, IconButton, Stack, Alert, Tooltip, Snackbar } from "@mui/material"
import { alpha } from "@mui/material/styles"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined"
import PageHeader from "@/components/ui/PageHeader"
import DataTable, { type DataTableColumn } from "@/components/ui/DataTable"
import PatientFilters from "@/components/patients/PatientFilters"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import {
  useGetAllPatientsQuery,
  useDownloadPatientReportsMutation,
} from "@/features/patient/patientApi"
import type { Patient } from "@/features/patient/types"
import { useClampPageToTotal } from "@/hooks/useClampPageToTotal"

const DoctorPatientsPage = () => {
  const [searchInput, setSearchInput] = useState("")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const debouncedSearch = useDebouncedValue(searchInput, 400)

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    setPage(1)
  }

  const { data, isFetching, isError } = useGetAllPatientsQuery({
    search: debouncedSearch,
    page,
    perPage,
  })

  useClampPageToTotal(page, data?.meta.totalPages, setPage)

  const [downloadReports, { isLoading: isDownloading }] = useDownloadPatientReportsMutation()

  const handleDownloadReports = async (patient: Patient) => {
    try {
      const { reports } = await downloadReports(patient.id).unwrap()
      if (reports.length > 0 && reports[0]?.report_url) {
        window.open(reports[0].report_url, "_blank")
      }
    } catch (err) {}
  }

  const patientColumns: DataTableColumn<Patient>[] = [
    {
      key: "patient_id",
      label: "Patient ID",
      render: (patient) => patient.patient_id,
    },
    {
      key: "name",
      label: "Name",
      render: (patient) => patient.name,
    },
    {
      key: "age",
      label: "Age",
      render: (patient) => patient.age,
    },
    {
      key: "gender",
      label: "Gender",
      render: (patient) => patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1),
    },
    {
      key: "phone",
      label: "Phone",
      render: (patient) => patient.phone_no,
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (patient) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title="Download reports">
            <IconButton
              size="small"
              disabled={isDownloading}
              onClick={() => handleDownloadReports(patient)}
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
              })}
            >
              <FileDownloadOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Classify patient">
            <IconButton
              component={Link}
              href={`/doctor/patients/${patient.id}/classify`}
              size="small"
              sx={(theme) => ({
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: theme.palette.success.main,
                "&:hover": { bgcolor: alpha(theme.palette.success.main, 0.2) },
              })}
            >
              <ScienceOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ]

  return (
    <Box>
      <PageHeader title="Patients" subtitle="Your assigned patients" />

      <PatientFilters
        search={searchInput}
        onSearchChange={handleSearchChange}
        showDoctorFilter={false}
      />

      {isError && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          Couldn&apos;t load patients. Please try again.
        </Alert>
      )}

      <DataTable
        columns={patientColumns}
        rows={data?.patients ?? []}
        rowKey={(patient) => patient.id}
        isLoading={isFetching}
        emptyMessage="No patients found"
        pagination={{
          page,
          perPage,
          totalItems: data?.meta.totalItems ?? 0,
          onPageChange: setPage,
          onPerPageChange: (newPerPage) => {
            setPerPage(newPerPage)
            setPage(1)
          },
        }}
      />
    </Box>
  )
}

export default DoctorPatientsPage
