import { z } from "zod";

export const idSchema = z.number().min(1);
