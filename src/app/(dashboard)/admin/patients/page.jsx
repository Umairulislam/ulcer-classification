"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Container,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  CircularProgress,
  Grid2,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Switch,
} from "@mui/material"
import Link from "next/link"
import { Edit, Delete, Add } from "@/assets/icons"
import {
  AxiosInstance,
  NoRecordsFound,
  CustomButton,
  StatusChip,
  AlertDialog,
} from "@/components"
import moment from "moment"
import { useDispatch } from "react-redux"
import { showToast } from "@/store/toastSlice"

const page = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const getPatients = async () => {
    setLoading(true)
    try {
      let path = `patient?page=${page + 1}&perPage=${rowsPerPage}`
      if (searchQuery) path += `&search=${searchQuery}`
      if (filterStatus !== "all") path += `&status=${filterStatus}`
      const { data } = await AxiosInstance.get(path)
      setPatients(data?.response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      const { data } = await AxiosInstance.delete(
        `patient/${selectedPatient?.id}`,
      )
      setPatients((prev) => {
        prev.details.filter((pat) => {
          return pat?.id !== selectedPatient?.id
        })
      })
      dispatch(showToast({ message: data?.message, type: "success" }))
      getPatients()
    } catch (error) {
      dispatch(
        showToast({ message: error.response.data.message, type: "error" }),
      )
      console.error("Failed to delete patient:", error)
    } finally {
      setDialogOpen(false)
      setSelectedPatient(null)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient)
    setDialogOpen(true)
  }

  useEffect(() => {
    const handler = setTimeout(getPatients, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [page, rowsPerPage, searchQuery, filterStatus])

  return (
    <Container>
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Typography variant="h4" fontWeight="bold">
          Patients
        </Typography>
        <Link href="/admin/patients/create">
          <CustomButton text="Add Patient" icon={Add} />
        </Link>
      </Stack>

      <Grid2
        container
        spacing={2}
        mt={2}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <TextField
          label="Search doctor"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 210 }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="deactive">Deactive</MenuItem>
          </Select>
        </FormControl>
      </Grid2>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
          marginTop: 4,
          border: "1px solid lightgray",
        }}
      >
        <TableContainer sx={{ height: "calc(100vh - 280px)" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {tableHead.map((head, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      color: "white",
                      backgroundColor: "primary.main",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={tableHead.length} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : patients?.details?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableHead.length} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No Patients found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                patients?.details?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone_no}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {moment(row.created_at).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Edit" arrow>
                          <Link href={`patients/update/${row.id}`}>
                            <IconButton
                              sx={{
                                backgroundColor: "secondary.light",
                                "&:hover": {
                                  backgroundColor: "primary.light",
                                  color: "white",
                                },
                              }}
                            >
                              <Edit />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            onClick={() => handleDeleteClick(row)}
                            sx={{
                              backgroundColor: "secondary.light",
                              "&:hover": {
                                backgroundColor: "primary.light",
                                color: "white",
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination section */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={patients?.extra?.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Alert Dialog */}
      <AlertDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Patient"
        content={`Are you sure you want to delete ${selectedPatient?.name} ?`}
      />
    </Container>
  )
}

export default page

const tableHead = ["Name", "Email", "Phone Number", "Create At", "Actions"]
