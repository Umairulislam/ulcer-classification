"use client"

import type { ReactNode } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TablePagination,
  Skeleton,
  Typography,
} from "@mui/material"

export interface DataTableColumn<T> {
  key: string
  label: string
  align?: "left" | "center" | "right"
  width?: string | number
  render: (row: T) => ReactNode
}

export interface DataTablePagination {
  // 1-indexed, matching the backend's `page` query param — NOT MUI's
  // native 0-indexed convention. The component converts internally.
  page: number
  perPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onPerPageChange?: (perPage: number) => void
  perPageOptions?: number[]
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string
  isLoading?: boolean
  emptyMessage?: string
  pagination?: DataTablePagination
}

const SKELETON_ROWS = 5

const DataTable = <T,>({
  columns,
  rows,
  rowKey,
  isLoading = false,
  emptyMessage = "No data found",
  pagination,
}: DataTableProps<T>) => {
  const showEmptyState = !isLoading && rows.length === 0

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align ?? "left"}
                sx={{ width: column.width }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading &&
            Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {!isLoading &&
            rows.map((row) => (
              <TableRow key={rowKey(row)} hover>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align ?? "left"}>
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {showEmptyState && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {pagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={columns.length}
                count={pagination.totalItems}
                page={pagination.page - 1}
                rowsPerPage={pagination.perPage}
                rowsPerPageOptions={pagination.perPageOptions ?? [10, 25, 50]}
                onPageChange={(_event, newPage) => pagination.onPageChange(newPage + 1)}
                onRowsPerPageChange={
                  pagination.onPerPageChange
                    ? (event) => pagination.onPerPageChange!(Number(event.target.value))
                    : undefined
                }
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  )
}

export default DataTable
