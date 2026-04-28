/** Generic API response wrapper from backend. */
export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
}

/** Paginated API response. */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Pagination metadata. */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** General API metadata. */
export interface ApiMeta {
  requestId?: string;
  timestamp?: string;
}

/** Standardized API error. */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  statusCode: number;
}

/** Pagination query params. */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/** Generic select option. */
export interface SelectOption<T = string> {
  label: string;
  value: T;
}
