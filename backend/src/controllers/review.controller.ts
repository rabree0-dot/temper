import { Request, Response } from "express";
import { prisma } from "../config/database";
import { apiResponse, apiError } from "../utils/api-response";

export async function createReview(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { productId, rating, comment } = req.body;

    const review = await prisma.review.create({ data: { userId, productId, rating, comment } });
    return apiResponse(res, 201, { review }, "Review created");
  } catch (error) {
    return apiError(res, 500, "Failed to create review");
  }
}

export async function getProductReviews(req: Request, res: Response) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: req.params.productId },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return apiResponse(res, 200, { reviews });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch reviews");
  }
}
