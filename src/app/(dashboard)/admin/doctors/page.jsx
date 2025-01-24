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
  Chip,
} from "@mui/material"
import Link from "next/link"
import { Edit, Delete, Add } from "@/assets/icons"
import {
  AxiosInstance,
  NoRecordsFound,
  CustomButton,
  StatusChip,
} from "@/components"
import moment from "moment"

// Dummy data array
const dummyData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  firstName: `First${index + 1}`,
  lastName: `Last${index + 1}`,
  email: `user${index + 1}@example.com`,
  phone: `123-456-789${index}`,
  createdAt: new Date().toLocaleDateString(),
  status: index % 2 === 0 ? "Active" : "Inactive",
}))

const tableHead = [
  "First Name",
  "Last Name",
  "Email",
  "Phone Number",
  "Create At",
  "Status",
  "Actions",
]

const page = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState([])

  const getDoctors = async () => {
    setLoading(true)
    try {
      const { data } = await AxiosInstance.get("doctor/all")
      setDoctors(data?.response)
    } catch (error) {
      console.log(error)
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

  useEffect(() => {
    getDoctors()
  }, [])

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

      {!loading && doctors?.details?.length === 0 ? (
        <NoRecordsFound title="There is no doctor to display" />
      ) : (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            boxShadow: "none",
            marginTop: 4,
            border: "1px solid lightgray",
          }}
        >
          <TableContainer sx={{ height: "calc(100vh - 230px)" }}>
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
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
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
                        <StatusChip status={row.status} />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Edit" arrow>
                            <IconButton
                              onClick={() => console.log("clicked")}
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
                          </Tooltip>
                          <Tooltip title="Delete" arrow>
                            <IconButton
                              onClick={() => console.log("clicked")}
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={dummyData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Container>
  )
}

export default page
