import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_NAME } from "./constants";
import { z } from "zod";
import { TUser } from "@/dto/users";

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

export function generateSearchParams(
  params: Record<string, string | number | undefined>,
) {
  // filter out undefined values
  const searchParams = new URLSearchParams();
  Object.keys(params)
    .filter(Boolean)
    .forEach((key) => {
      if (!params[key]) return;
      searchParams.append(key, params[key]!.toString());
    });

  return searchParams;
}

export async function urlToFile(url: string): Promise<File> {
  // Fetch the image from the URL
  const response = await fetch(url);

  // Get the image as a Blob
  const blob = await response.blob();

  // Extract the filename from the URL
  const filename = url.split("/").pop() ?? "file";

  // Extract the file extension to determine the MIME type
  const ext = filename.split(".").pop();
  const mimeType = ext ? `image/${ext}` : "application/octet-stream"; // Default to 'application/octet-stream' if the type is unknown

  // Create and return a new File object
  return new File([blob], filename, { type: mimeType });
}

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// https://github.com/orgs/react-hook-form/discussions/1991#discussioncomment-4593488
type UnknownObject = Record<string, unknown>;
type UnknownArrayOrObject = unknown[] | UnknownObject;
export function getDirtyFields(
  dirtyFields: UnknownArrayOrObject | boolean | unknown,
  allValues: UnknownArrayOrObject | unknown,
): UnknownArrayOrObject | unknown {
  if (dirtyFields === true ?? Array.isArray(dirtyFields)) {
    return allValues;
  }

  if (typeof dirtyFields !== "object" ?? dirtyFields === null) {
    return undefined;
  }

  const dirtyFieldsObject = dirtyFields as UnknownObject;
  const allValuesObject = allValues as UnknownObject;

  return Object.fromEntries(
    Object.entries(dirtyFieldsObject).map(([key, value]) => [
      key,
      getDirtyFields(value, allValuesObject[key]),
    ]),
  );
}
