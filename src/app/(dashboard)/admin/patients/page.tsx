"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Box, Button, IconButton, Stack, Alert } from "@mui/material"
import { alpha } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import PageHeader from "@/components/ui/PageHeader"
import DataTable, { type DataTableColumn } from "@/components/ui/DataTable"
import ConfirmDialog from "@/components/ui/ConfirmDialog"
import PatientFilters from "./PatientFilters"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useGetAllPatientsQuery, useDeletePatientMutation } from "@/features/patient/patientApi"
import type { Patient } from "@/features/patient/types"

const PatientsPage = () => {
  const [searchInput, setSearchInput] = useState("")
  const [doctorId, setDoctorId] = useState("all")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null)

  const debouncedSearch = useDebouncedValue(searchInput, 400)

  // Same reasoning as the doctors list — any change to search or the
  // doctor filter changes the whole result set, so it resets to page 1
  // rather than leaving the user stranded on a page that may not exist
  // in the new filtered results.
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, doctorId])

  const { data, isFetching, isError } = useGetAllPatientsQuery({
    search: debouncedSearch,
    doctor_id: doctorId,
    page,
    perPage,
  })

  const [deletePatient, { isLoading: isDeleting }] = useDeletePatientMutation()

  const handleDeleteConfirm = async () => {
    if (!patientToDelete) return
    try {
      await deletePatient(patientToDelete.id).unwrap()
    } catch {
      // TODO: surface via toast once a toast/snackbar system exists
    } finally {
      setPatientToDelete(null)
    }
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
      key: "doctor",
      label: "Assigned Doctor",
      render: (patient) => `Dr. ${patient.user.first_name} ${patient.user.last_name}`,
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (patient) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton
            component={Link}
            href={`/admin/patients/${patient.id}/edit`}
            size="small"
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
            })}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setPatientToDelete(patient)}
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
              "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.2) },
            })}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ]

  return (
    <Box>
      <PageHeader
        title="Patients"
        subtitle="Manage your patients"
        actions={
          <Button
            component={Link}
            href="/admin/patients/create"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Patient
          </Button>
        }
      />

      <PatientFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        doctorId={doctorId}
        onDoctorIdChange={setDoctorId}
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

      <ConfirmDialog
        open={!!patientToDelete}
        title={`Delete ${patientToDelete?.name ?? "this patient"}?`}
        description="This will permanently remove this patient and their records. This cannot be undone."
        confirmLabel="Delete"
        confirmColor="error"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPatientToDelete(null)}
      />
    </Box>
  )
}

export default PatientsPage
