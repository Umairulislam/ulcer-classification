import { Chip } from "@mui/material"

interface StatusChipProps {
  status: "active" | "inactive"
}

const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      label={status === "active" ? "Active" : "Inactive"}
      color={status === "active" ? "success" : "default"}
      size="small"
    />
  )
}

export default StatusChip
