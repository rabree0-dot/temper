import { z } from "zod";

export const createProductSchema = z.object({
  nameEn: z.string().min(1, "English name is required"),
  nameAr: z.string().min(1, "Arabic name is required"),
  slug: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionAr: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  comparePrice: z.number().positive().optional().nullable(),
  stock: z.number().int().min(0).default(0),
  categoryId: z.string().min(1, "Category is required"),
  featured: z.boolean().default(false),
  isOffer: z.boolean().default(false),
  isUsed: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const updateProductSchema = createProductSchema.partial();
