import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadThingGetFileKeyFromUrl = (url: string) => {
  const fileKey = url.split("/f/");
  return fileKey[1];
};
