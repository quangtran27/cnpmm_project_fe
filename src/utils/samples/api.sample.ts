import { ApiResponse, PaginatedRespone } from '@/types/api.type'

export function emptyReponse<Data>(data: Data): ApiResponse<Data> {
  return {
    isSuccess: false,
    message: '',
    data: data,
  }
}

export function emptyPaginatedData<Data>(data: Data): PaginatedRespone<Data> {
  return {
    content: data,
    pageSize: 12,
    totalPages: 0,
    currentPage: 0,
    total: 0,
  }
}

export function emptyPaginatedResponse<Data>(data: Data): ApiResponse<PaginatedRespone<Data>> {
  return {
    isSuccess: false,
    message: '',
    data: emptyPaginatedData<Data>(data),
  }
}
