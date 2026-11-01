import { useEffect } from "react"

// If the current page no longer exists  snap back to the last valid page
export const useClampPageToTotal = (
  page: number,
  totalPages: number | undefined,
  setPage: (page: number) => void
) => {
  useEffect(() => {
    if (totalPages && totalPages > 0 && page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages, setPage])
}
