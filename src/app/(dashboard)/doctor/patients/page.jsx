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
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material"

import { AxiosInstance } from "@/components"
import moment from "moment"
import { useDispatch } from "react-redux"
import { Science } from "@/assets/icons"
import Link from "next/link"

const page = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [patients, setPatients] = useState([])
  const [filterPatient, setFilterPatient] = useState(null)

  const getPatients = async () => {
    setLoading(true)
    try {
      let path = `patient/all?page=${page + 1}&perPage=${rowsPerPage}`
      const { data } = await AxiosInstance.get(path)
      setPatients(data?.response)
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
    getPatients()
  }, [page, rowsPerPage])

  return (
    <Container>
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Typography variant="h4" fontWeight="bold">
          Patients
        </Typography>
      </Stack>

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
          marginTop: 4,
          border: "1px solid lightgray",
        }}
      >
        <TableContainer sx={{ height: "calc(100vh - 240px)" }}>
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
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {moment(row.created_at).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="classify" arrow>
                          <Link href={`patients/classify/${row.id}`}>
                            <IconButton
                              sx={{
                                backgroundColor: "secondary.light",
                                "&:hover": {
                                  backgroundColor: "primary.light",
                                  color: "white",
                                },
                              }}
                            >
                              <Science />
                            </IconButton>
                          </Link>
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
    </Container>
  )
}

export default page

const tableHead = [
  "Name",
  "Email",
  "Phone Number",
  "Gender",
  "Age",
  "Create At",
  "Actions",
]
