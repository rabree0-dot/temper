import { Request, Response } from "express";
import { prisma } from "../config/database";
import { apiResponse, apiError } from "../utils/api-response";
import { log } from "../utils/logger";

export async function createCoupon(req: Request, res: Response) {
  try {
    const coupon = await prisma.coupon.create({ data: req.body });
    return apiResponse(res, 201, { coupon }, "Coupon created");
  } catch (error) {
    return apiError(res, 500, "Failed to create coupon");
  }
}

export async function getCoupons(req: Request, res: Response) {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
    return apiResponse(res, 200, { coupons });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch coupons");
  }
}

export async function updateCoupon(req: Request, res: Response) {
  try {
    const coupon = await prisma.coupon.update({ where: { id: req.params.id }, data: req.body });
    return apiResponse(res, 200, { coupon }, "Coupon updated");
  } catch (error) {
    return apiError(res, 500, "Failed to update coupon");
  }
}

export async function deleteCoupon(req: Request, res: Response) {
  try {
    await prisma.coupon.delete({ where: { id: req.params.id } });
    return apiResponse(res, 200, null, "Coupon deleted");
  } catch (error) {
    return apiError(res, 500, "Failed to delete coupon");
  }
}
