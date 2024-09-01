import { z } from "zod";

export const PageSchema = z.coerce.number().int().min(1).catch(1);
