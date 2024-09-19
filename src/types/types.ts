import { TApiResponse } from "@/lib/api-response";
import { TPagination } from "@/lib/generate-pagination";
import { NextRequest, NextResponse } from "next/server";

export type TPaginationQuery = {
  page?: number;
  limit?: number;
};

export type TQueryWithPagination<T extends object> = TPaginationQuery & T;

export type TNavMenu = {
  name: string;
  href: string;
};

export type TDataWithPagination<T> = TPagination & {
  data: T;
};

export type TApiHandler<T extends object> = (
  req: NextRequest,
  params: T,
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;
