import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/database";
import { generateToken } from "../utils/jwt";
import { apiResponse, apiError } from "../utils/api-response";
import { log } from "../utils/logger";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return apiError(res, 409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone },
      select: { id: true, name: true, email: true, role: true, phone: true },
    });

    const token = generateToken({ userId: user.id, role: user.role });

    log.info("User registered", { email });
    return apiResponse(res, 201, { user, token }, "Registration successful");
  } catch (error) {
    log.error("Registration failed", error);
    return apiError(res, 500, "Registration failed");
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return apiError(res, 401, "Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return apiError(res, 401, "Invalid email or password");
    }

    const token = generateToken({ userId: user.id, role: user.role });

    log.info("User logged in", { email });
    return apiResponse(res, 200, {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    }, "Login successful");
  } catch (error) {
    log.error("Login failed", error);
    return apiError(res, 500, "Login failed");
  }
}

export async function getMe(req: Request, res: Response) {
  const user = (req as any).user;
  return apiResponse(res, 200, { user }, "Profile retrieved");
}
