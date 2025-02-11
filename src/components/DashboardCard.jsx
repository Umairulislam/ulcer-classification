import { Card, CardContent, Typography, Grid2 } from "@mui/material"

const DashboardCard = ({ title, value }) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
      <Card sx={{ border: "1px solid lightgray", boxShadow: "none" }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  )
}

export default DashboardCard
