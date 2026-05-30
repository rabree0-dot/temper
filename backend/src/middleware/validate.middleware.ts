import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { apiError } from "../utils/api-response";

export function validate(schema: ZodSchema, source: "body" | "query" | "params" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return apiError(res, 400, "Validation failed", errors);
    }
    (req as any).validated = result.data;
    next();
  };
}
