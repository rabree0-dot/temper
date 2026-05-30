import { Request, Response } from "express";
import { prisma } from "../config/database";
import { apiResponse, apiError } from "../utils/api-response";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true, _count: { select: { orders: true } } },
      orderBy: { createdAt: "desc" },
    });
    return apiResponse(res, 200, { users });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch users");
  }
}
