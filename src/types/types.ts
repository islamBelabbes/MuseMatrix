export type TPaginationQuery = {
  page?: number;
  limit?: number;
};

export type TNavMenu = {
  name: string;
  href: string;
};

export type TDataWithPagination<T> = {
  data: T;
  count: number;
  totalPages: number;
  hasNext: boolean;
};
