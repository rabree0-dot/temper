import { z } from "zod";

export const createCouponSchema = z.object({
  code: z.string().min(1, "Code is required"),
  discount: z.number().positive("Discount must be positive"),
  type: z.enum(["PERCENTAGE", "FIXED"]).default("PERCENTAGE"),
  minAmount: z.number().positive().optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
});

export const updateCouponSchema = createCouponSchema.partial();
