import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_NAME } from "./constants";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSeoTitle = (titles: string[]) => {
  return `${SITE_NAME} | ${titles.join(" | ")}`;
};

export const flatZodError = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    [issue.path[0] ?? "unknown"]: issue.message,
  }));
};

export function generateSearchParams(params: {
  [key: string]: string | number | undefined;
}) {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (!params[key]) return;
    searchParams.append(key, params[key]!.toString());
  });

  return searchParams;
}
