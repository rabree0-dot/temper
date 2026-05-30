import { Request, Response } from "express";
import { prisma } from "../config/database";
import { apiResponse, apiError } from "../utils/api-response";
import { log } from "../utils/logger";

export async function createOrder(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { items, phone, address, notes, paymentMethod, couponCode } = req.body;

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) return apiError(res, 404, `Product ${item.productId} not found`);
      if (product.stock < item.quantity) return apiError(res, 400, `Insufficient stock for ${product.nameEn}`);

      total += Number(product.price) * item.quantity;
      orderItems.push({ productId: item.productId, quantity: item.quantity, price: product.price });
    }

    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && coupon.isActive && (!coupon.expiresAt || coupon.expiresAt > new Date()) && (!coupon.maxUses || coupon.usedCount < coupon.maxUses)) {
        if (!coupon.minAmount || total >= Number(coupon.minAmount)) {
          discount = coupon.type === "PERCENTAGE" ? total * (Number(coupon.discount) / 100) : Number(coupon.discount);
          await prisma.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
        }
      }
    }

    const finalTotal = Math.max(0, total - discount);

    const order = await prisma.order.create({
      data: {
        userId,
        total: finalTotal,
        phone,
        address,
        notes,
        paymentMethod,
        items: { create: orderItems },
      },
      include: { items: { include: { product: true } } },
    });

    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    log.info("Order created", { orderId: order.id, total: finalTotal });
    return apiResponse(res, 201, { order }, "Order created");
  } catch (error) {
    log.error("Failed to create order", error);
    return apiError(res, 500, "Failed to create order");
  }
}

export async function getOrders(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const isAdmin = (req as any).user?.role === "ADMIN";
    const where = isAdmin && !req.query.my ? {} : { userId };

    const orders = await prisma.order.findMany({
      where,
      include: { items: { include: { product: { include: { images: { take: 1 } } } } }, user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    return apiResponse(res, 200, { orders });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch orders");
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    log.info("Order status updated", { orderId: order.id, status });
    return apiResponse(res, 200, { order }, "Order status updated");
  } catch (error) {
    return apiError(res, 500, "Failed to update order");
  }
}
