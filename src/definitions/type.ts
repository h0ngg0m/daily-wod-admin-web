export interface ApiResult<T> {
  code: string
  message: string
  data: T | null
}

export interface JwtResponseDto {
  accessToken: string
}

export interface Menu {
  title: string
  icon: string
  to: string
}

export interface PageResult<T> {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: { empty: boolean; sorted: boolean; unsorted: boolean }
    unpaged: boolean
  }
  sort: { empty: boolean; sorted: boolean; unsorted: boolean }
  totalElements: number
  totalPages: number
}

export interface Pagination {
  page: number
  sortBy: string[]
  sortDesc: boolean[]
  itemsPerPage: number // -1 for All
}

export interface SortItem {
  key: string
  order?: boolean | 'asc' | 'desc'
}
