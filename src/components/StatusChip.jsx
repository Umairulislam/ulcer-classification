import { Chip } from "@mui/material"

const StatusChip = ({ status }) => {
  const backgroundColor =
    status === "active" ? "primary.light" : "secondary.light"
  return <Chip label={status} sx={{ backgroundColor, color: "black" }} />
}

export default StatusChip
