import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1, "At least one item is required"),
  phone: z.string().optional(),
  address: z.any().optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "card"]).default("cod"),
  couponCode: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});
