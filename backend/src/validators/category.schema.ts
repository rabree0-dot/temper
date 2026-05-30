import { z } from "zod";

export const createCategorySchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  slug: z.string().optional(),
  image: z.string().optional(),
  parentId: z.string().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();
