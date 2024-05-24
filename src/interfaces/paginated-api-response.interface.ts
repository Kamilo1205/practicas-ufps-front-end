export interface PaginatedApiResponse<T> {
  data: T[];
  total: number;
}
