import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/database";
import { apiError } from "../utils/api-response";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return apiError(res, 401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return apiError(res, 401, "User not found");
    }

    (req as any).user = user;
    next();
  } catch {
    return apiError(res, 401, "Invalid or expired token");
  }
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (!user || user.role !== "ADMIN") {
    return apiError(res, 403, "Admin access required");
  }
  next();
}
