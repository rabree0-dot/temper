import { Response } from "express";

export function apiResponse(res: Response, status: number, data: unknown, message = "Success") {
  return res.status(status).json({ success: true, message, data });
}

export function apiError(res: Response, status: number, message: string, errors?: unknown) {
  return res.status(status).json({ success: false, message, errors });
}
