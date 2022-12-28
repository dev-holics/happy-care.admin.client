export interface PaginationResponseModel<T> {
  data: T | null;
  totalData: number;
  success: boolean;
}
