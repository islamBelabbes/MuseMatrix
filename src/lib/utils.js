import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const manipulateSearchParams = (params, type) => {
  const manuiplationType = ["set", "delete"];
  if (!manuiplationType.includes(type)) {
    throw new Error("type must be set or delete");
  }

  const url = new URL(location);

  if (type === "set") {
    for (const param of params) {
      url.searchParams.set(param.key, param.value);
    }
  } else {
    for (const param of params) {
      url.searchParams.delete(param.key);
    }
  }
  return history.pushState({}, "", url);
};

// Function to convert Data URL to File object
export function dataURLtoFile(dataURL, filename) {
  // Extract base64-encoded data from Data URL
  const base64String = dataURL.split(",")[1];

  // Convert base64-encoded data to binary format
  const binaryString = atob(base64String);

  // Create ArrayBuffer from binary data
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Populate ArrayBuffer with binary data
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Create Blob from ArrayBuffer
  const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

  // Create File object with Blob, filename, and MIME type
  return new File([blob], filename, { type: "image/jpeg" });
}

export const tryCatch = async (Promise) => {
  try {
    const data = await Promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const cn = (...args) => {
  return twMerge(clsx(args));
};

export const uploadThingGetFileKeyFromUrl = (url) => {
  const fileKey = url.split("/f/");
  return fileKey[1];
};

export const removeEmptyObjectValues = (obj) => {
  return Object.keys(obj).reduce((acc, filter) => {
    if (obj[filter]) {
      acc = { ...acc, [filter]: obj[filter] };
    }
    return acc;
  }, {});
};

export const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
