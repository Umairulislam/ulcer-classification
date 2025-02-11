import { Chip } from "@mui/material"

const StatusChip = ({ status }) => {
  const backgroundColor = status === true ? "primary.light" : "secondary.light"
  return (
    <Chip
      label={status ? "Classified" : "Not classified"}
      sx={{ backgroundColor, color: "black" }}
      // color={status ? "success" : "error"}
    />
  )
}

export default StatusChip
