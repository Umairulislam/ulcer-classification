"use client"

import { Box, Typography, Grid, Skeleton, Alert } from "@mui/material"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined"
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined"
import StatCard from "@/components/dashboard/StatCard"
import ClassificationStatusChart from "@/components/dashboard/ClassificationStatusChart"
import ClassificationTrendChart from "@/components/dashboard/ClassificationTrendChart"
import RecentActivity from "@/components/dashboard/RecentActivity"
import { useGetDoctorDashboardQuery } from "@/features/dashboard/dashboardApi"
import {
  doctorClassificationTrendMock,
  doctorActivityMock,
} from "@/features/dashboard/dashboard.mock"

const DoctorDashboardPage = () => {
  const { data, isLoading, isError } = useGetDoctorDashboardQuery()

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

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

        <Grid size={{ xs: 12, sm: 4 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={92} />
          ) : (
            <StatCard
              label="Pending Classifications"
              value={data?.total_pending_classification ?? 0}
              icon={HourglassEmptyOutlinedIcon}
              color="warning"
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 2.5 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ClassificationTrendChart
            data={doctorClassificationTrendMock}
            title="Your classifications this week"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          {!isLoading && data && (
            <ClassificationStatusChart
              completed={data.total_classification}
              pending={data.total_pending_classification}
            />
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 2.5 }}>
        <RecentActivity items={doctorActivityMock} title="Your recent activity" />
      </Box>
    </Box>
  )
}

export default DoctorDashboardPage
