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
  const [doctors, setDoctors] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const getDoctors = async () => {
    setLoading(true)
    try {
      let path = `doctor/all?page=${page + 1}&perPage=${rowsPerPage}`
      if (searchQuery) path += `&search=${searchQuery}`
      if (filterStatus !== "all") path += `&status=${filterStatus}`
      const { data } = await AxiosInstance.get(path)
      setDoctors(data?.response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      const { data } = await AxiosInstance.delete(
        `doctor/delete/${selectedDoctor?.id}`,
      )
      setDoctors((prev) => {
        prev.details.filter((doc) => {
          return doc?.id !== selectedDoctor?.id
        })
      })
      dispatch(showToast({ message: data?.message, type: "success" }))
      getDoctors()
    } catch (error) {
      dispatch(
        showToast({ message: error.response.data.message, type: "error" }),
      )
      console.error("Failed to delete doctor:", error)
    } finally {
      setDialogOpen(false)
      setSelectedDoctor(null)
    }
  }

  const handleToggleStatus = async (doctor) => {
    console.log("doctor", doctor)
    setLoading(true)
    try {
      const { data } = await AxiosInstance.patch(
        `doctor/update/status/${doctor.id}`,
        {
          status: doctor.status === "active" ? "deactive" : "active",
        },
      )
      dispatch(showToast({ message: data.message, type: "success" }))
      getDoctors()
    } catch (error) {
      console.error("Error toggling doctor status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor)
    setDialogOpen(true)
  }

  useEffect(() => {
    const handler = setTimeout(getDoctors, 500)
    return () => {
      clearTimeout(handler)
    }
  }, [page, rowsPerPage, searchQuery, filterStatus])

  return (
    <Container>
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Typography variant="h4" fontWeight="bold">
          Doctors
        </Typography>
        <Link href="/admin/doctors/create">
          <CustomButton text="Add Doctor" icon={Add} />
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

      {/* {!loading && doctors?.details?.length === 0 ? (
        <NoRecordsFound title="There is no doctor to display" />
      ) : ( */}
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
              ) : doctors?.details?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableHead.length} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No Doctors found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                doctors?.details?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone_no}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {moment(row.created_at).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {/* <StatusChip status={row.status} /> */}
                      <Tooltip title={row.status} arrow>
                        <Switch
                          checked={row.status === "active"}
                          onChange={() => handleToggleStatus(row)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Edit" arrow>
                          <Link href={`doctors/update/${row.id}`}>
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
          count={doctors?.extra?.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* )} */}

      {/* Alert Dialog */}
      <AlertDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Doctor"
        content={`Are you sure you want to delete Dr. ${selectedDoctor?.first_name} ${selectedDoctor?.last_name}?`}
      />
    </Container>
  )
}

export default page

const tableHead = [
  "First Name",
  "Last Name",
  "Email",
  "Phone Number",
  "Create At",
  "Status",
  "Actions",
]
