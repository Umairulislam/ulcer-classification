import { Card, CardContent, Typography, Grid } from "@mui/material"

const DashboardCard = ({ title, value }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
    </Grid>
  )
}

export default DashboardCard
