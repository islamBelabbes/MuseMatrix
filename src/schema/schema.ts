import { z } from "zod";

export const PageSchema = z.coerce.number().int().min(1).catch(1);

export const IdSchema = z.coerce.number().min(1);

export const ImageSchema = z
  .instanceof(File)
  .refine((file) => {
    return !file || file.size <= 1024 * 1024 * 10;
  }, "File size must be less than 3MB")
  .refine((file) => {
    if (!file) return false;
    return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
  }, "File must be a PNG");

export const PaginationSchema = z.object({
  page: PageSchema,
  limit: PageSchema.removeCatch()
    .or(z.coerce.number().pipe(z.literal(-1)))
    .catch(5),
});
