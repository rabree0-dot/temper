import { Request, Response, NextFunction } from "express";
import { log } from "../utils/logger";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  log.error("Unhandled error", {
    path: req.path,
    method: req.method,
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  const status = (err as any).status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
