export type ApiResponse<Data> = {
  isSuccess: boolean
  message: string
  data: Data
}

export type PaginatedData = {
  currentPage: number
  pageSize: number
  totalPages: number
  total: number
}

export type PaginatedRespone<Data> = PaginatedData & {
  content: Data
}
