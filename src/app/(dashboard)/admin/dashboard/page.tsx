"use client"

import Link from "next/link"
import { Box, Grid, Skeleton, Alert, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined"
import PageHeader from "@/components/ui/PageHeader"
import StatCard from "@/components/dashboard/StatCard"
import ClassificationTrendChart from "@/components/dashboard/ClassificationTrendChart"
import WagnerGradeChart from "@/components/dashboard/WagnerGradeChart"
import RecentActivity from "@/components/dashboard/RecentActivity"
import { useGetAdminDashboardQuery } from "@/features/dashboard/dashboardApi"

const AdminDashboardPage = () => {
  const { data, isLoading, isError } = useGetAdminDashboardQuery()

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        actions={
          <>
            <Button
              component={Link}
              href="/admin/doctors/create"
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Add Doctor
            </Button>
            <Button
              component={Link}
              href="/admin/patients/create"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Patient
            </Button>
          </>
        }
      />

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Couldn&apos;t load dashboard stats. Please refresh the page.
        </Alert>
      )}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={92} />
          ) : (
            <StatCard
              label="Total Doctors"
              value={data?.total_doctor ?? 0}
              icon={LocalHospitalOutlinedIcon}
              color="primary"
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={92} />
          ) : (
            <StatCard
              label="Total Patients"
              value={data?.total_patients ?? 0}
              icon={PeopleAltOutlinedIcon}
              color="info"
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={92} />
          ) : (
            <StatCard
              label="Total Classifications"
              value={data?.total_classification ?? 0}
              icon={AssignmentTurnedInOutlinedIcon}
              color="success"
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 2.5 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ClassificationTrendChart />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <WagnerGradeChart />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2.5 }}>
        <RecentActivity />
      </Box>
    </Box>
  )
}

export default AdminDashboardPage
