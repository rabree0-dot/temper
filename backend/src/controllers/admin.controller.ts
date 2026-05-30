import { Request, Response } from "express";
import { prisma } from "../config/database";
import { apiResponse, apiError } from "../utils/api-response";

export async function getStats(req: Request, res: Response) {
  try {
    const [totalOrders, totalRevenue, totalUsers, totalProducts] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.user.count(),
      prisma.product.count({ where: { isActive: true } }),
    ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } }, items: { include: { product: { select: { nameEn: true } } } } },
    });

    return apiResponse(res, 200, {
      stats: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalUsers,
        totalProducts,
      },
      recentOrders,
    });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch stats");
  }
}
