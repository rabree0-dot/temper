import { Request, Response } from "express";
import { prisma } from "../config/database";
import { apiResponse, apiError } from "../utils/api-response";

export async function getWishlist(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const items = await prisma.wishlist.findMany({
      where: { userId },
      include: { product: { include: { images: { take: 1 } } } },
    });
    return apiResponse(res, 200, { items });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch wishlist");
  }
}

export async function addToWishlist(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.body;

    const existing = await prisma.wishlist.findUnique({ where: { userId_productId: { userId, productId } } });
    if (existing) return apiError(res, 409, "Already in wishlist");

    const item = await prisma.wishlist.create({ data: { userId, productId } });
    return apiResponse(res, 201, { item }, "Added to wishlist");
  } catch (error) {
    return apiError(res, 500, "Failed to add to wishlist");
  }
}

export async function removeFromWishlist(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    await prisma.wishlist.delete({ where: { userId_productId: { userId, productId: req.params.productId } } });
    return apiResponse(res, 200, null, "Removed from wishlist");
  } catch (error) {
    return apiError(res, 500, "Failed to remove from wishlist");
  }
}
