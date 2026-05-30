import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { apiResponse, apiError } from "../utils/api-response";
import { log } from "../utils/logger";
import sharp from "sharp";

export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.file) return apiError(res, 400, "No file uploaded");

    const buffer = await sharp(req.file.buffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "temper", resource_type: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(buffer);
    });

    log.info("Image uploaded", { publicId: result.public_id });
    return apiResponse(res, 201, { url: result.secure_url, publicId: result.public_id }, "Image uploaded");
  } catch (error) {
    log.error("Upload failed", error);
    return apiError(res, 500, "Upload failed");
  }
}

export async function deleteImage(req: Request, res: Response) {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    return apiResponse(res, 200, null, "Image deleted");
  } catch (error) {
    return apiError(res, 500, "Failed to delete image");
  }
}
