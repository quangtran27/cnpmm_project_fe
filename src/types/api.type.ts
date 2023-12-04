export type ApiResponse<Data> = {
  isSuccess: boolean
  message: string
  data: Data
}

export type PaginatedData = {
  currentPage: number
  pageSize: number
  totalPage: number
}

export type PaginatedRespone<Data> = PaginatedData & {
  content: Data
}
