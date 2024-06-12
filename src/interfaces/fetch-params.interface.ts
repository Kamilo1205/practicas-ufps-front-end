export interface SortRule {
  id: string;
  desc: boolean;
}

export interface FetchParams {
  page?: number;
  limit?: number;
  sort?: SortRule[];
  filters?: { [key: string]: string };
  search?: string;
}
  