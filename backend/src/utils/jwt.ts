import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload {
  userId: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtSecret) as TokenPayload;
}
