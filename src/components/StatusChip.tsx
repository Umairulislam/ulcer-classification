import { Chip } from "@mui/material"

interface StatusChipProps {
  status: boolean
}

const StatusChip = ({ status }: StatusChipProps) => {
  const backgroundColor = status === true ? "primary.light" : "secondary.light"
  return (
    <Chip
      label={status ? "Classified" : "Not classified"}
      sx={{ backgroundColor, color: "black" }}
    />
  )
}

export default StatusChip
