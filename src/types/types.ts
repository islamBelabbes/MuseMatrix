import { TPagination } from "@/lib/generate-pagination";

export type TPaginationQuery = {
  page: number;
  limit: number;
};

export type TQueryWithPagination<T extends object> = TPaginationQuery & T;

export type TNavMenu = {
  name: string;
  href: string;
};

export type TDataWithPagination<T> = TPagination & {
  data: T;
};
