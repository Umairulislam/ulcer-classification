"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { alpha } from "@mui/material/styles"
import { Box, Button, IconButton, Avatar, Stack, Switch, Typography, Alert } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import PageHeader from "@/components/ui/PageHeader"
import DataTable, { type DataTableColumn } from "@/components/ui/DataTable"
import ConfirmDialog from "@/components/ui/ConfirmDialog"
import DoctorFilters from "./DoctorFilters"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import {
  useGetAllDoctorsQuery,
  useUpdateDoctorStatusMutation,
  useDeleteDoctorMutation,
} from "@/features/doctor/doctorApi"
import type { Doctor, DoctorStatus } from "@/features/doctor/types"

type ConfirmAction = { type: "deactivate"; doctor: Doctor } | { type: "delete"; doctor: Doctor }

const DoctorsPage = () => {
  const [searchInput, setSearchInput] = useState("")
  const [status, setStatus] = useState<DoctorStatus | "all">("all")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null)
  const [pendingDoctorId, setPendingDoctorId] = useState<string | null>(null)

  const debouncedSearch = useDebouncedValue(searchInput, 400)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status])

  const { data, isFetching, isError } = useGetAllDoctorsQuery({
    search: debouncedSearch,
    status,
    page,
    perPage,
  })

  const [updateDoctorStatus, { isLoading: isStatusUpdating }] = useUpdateDoctorStatusMutation()
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation()

  const handleToggleStatus = async (doctor: Doctor, nextChecked: boolean) => {
    if (!nextChecked) {
      setConfirmAction({ type: "deactivate", doctor })
      return
    }
    setPendingDoctorId(doctor.id)
    try {
      await updateDoctorStatus({ id: doctor.id, status: "active" }).unwrap()
    } catch {
      // TODO: surface via toast once a toast/snackbar system exists
    } finally {
      setPendingDoctorId(null)
    }
  }

  const handleDeleteClick = (doctor: Doctor) => {
    setConfirmAction({ type: "delete", doctor })
  }

  const handleConfirm = async () => {
    if (!confirmAction) return
    const { type, doctor } = confirmAction

    setPendingDoctorId(doctor.id)
    try {
      if (type === "deactivate") {
        await updateDoctorStatus({ id: doctor.id, status: "deactive" }).unwrap()
      } else {
        await deleteDoctor(doctor.id).unwrap()
      }
    } catch {
      // TODO: surface via toast once a toast/snackbar system exists
    } finally {
      setPendingDoctorId(null)
      setConfirmAction(null)
    }
  }

  const doctorColumns: DataTableColumn<Doctor>[] = [
    {
      key: "name",
      label: "Name",
      render: (doctor) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>
            {doctor.first_name[0]}
            {doctor.last_name[0]}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {doctor.first_name} {doctor.last_name}
          </Typography>
        </Stack>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (doctor) => doctor.email,
    },
    {
      key: "phone",
      label: "Phone",
      render: (doctor) => doctor.phone_no,
    },
    {
      key: "status",
      label: "Status",
      render: (doctor) => {
        const isActive = doctor.status === "active"
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Switch
              size="small"
              checked={isActive}
              disabled={pendingDoctorId === doctor.id}
              onChange={(e) => handleToggleStatus(doctor, e.target.checked)}
            />
            <Typography variant="body2" color={isActive ? "success.main" : "text.secondary"}>
              {isActive ? "Active" : "Inactive"}
            </Typography>
          </Stack>
        )
      },
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (doctor) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton
            component={Link}
            href={`/admin/doctors/${doctor.id}/edit`}
            size="small"
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
              borderRadius: "50%",
            })}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteClick(doctor)}
            sx={(theme) => ({
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: theme.palette.error.main,
              "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.2) },
              borderRadius: "50%",
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
        title="Doctors"
        subtitle="Manage your doctors"
        actions={
          <Button
            component={Link}
            href="/admin/doctors/create"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Doctor
          </Button>
        }
      />

      <DoctorFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        status={status}
        onStatusChange={setStatus}
      />

      {isError && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          Couldn&apos;t load doctors. Please try again.
        </Alert>
      )}

      <DataTable
        columns={doctorColumns}
        rows={data?.doctors ?? []}
        rowKey={(doctor) => doctor.id}
        isLoading={isFetching}
        emptyMessage="No doctors found"
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
        open={!!confirmAction}
        title={
          confirmAction?.type === "delete"
            ? `Delete Dr. ${confirmAction.doctor.first_name} ${confirmAction.doctor.last_name}?`
            : `Deactivate Dr. ${confirmAction?.doctor.first_name ?? ""} ${confirmAction?.doctor.last_name ?? ""}?`
        }
        description={
          confirmAction?.type === "delete"
            ? "This will permanently remove this doctor and cannot be undone."
            : "They will no longer be able to log in or access patient records."
        }
        confirmLabel={confirmAction?.type === "delete" ? "Delete" : "Deactivate"}
        confirmColor="error"
        isLoading={confirmAction?.type === "delete" ? isDeleting : isStatusUpdating}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />
    </Box>
  )
}

export default DoctorsPage
