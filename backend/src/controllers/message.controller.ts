import { Request, Response } from "express";
import { prisma } from "../config/database";
import { apiResponse, apiError } from "../utils/api-response";
import { log } from "../utils/logger";

export async function createMessage(req: Request, res: Response) {
  try {
    const message = await prisma.message.create({ data: req.body });
    log.info("Message received", { from: req.body.email, subject: req.body.subject });
    return apiResponse(res, 201, { message }, "Message sent");
  } catch (error) {
    return apiError(res, 500, "Failed to send message");
  }
}

export async function getMessages(req: Request, res: Response) {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
    return apiResponse(res, 200, { messages });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch messages");
  }
}

export async function markAsRead(req: Request, res: Response) {
  try {
    const message = await prisma.message.update({ where: { id: req.params.id }, data: { isRead: true } });
    return apiResponse(res, 200, { message }, "Message marked as read");
  } catch (error) {
    return apiError(res, 500, "Failed to update message");
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    return apiResponse(res, 200, null, "Message deleted");
  } catch (error) {
    return apiError(res, 500, "Failed to delete message");
  }
}
