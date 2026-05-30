import { Request, Response } from "express";
import { prisma } from "../config/database";
import { slugify } from "../utils/slug";
import { apiResponse, apiError } from "../utils/api-response";
import { log } from "../utils/logger";

export async function getCategories(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: "asc" },
    });
    return apiResponse(res, 200, { categories });
  } catch (error) {
    return apiError(res, 500, "Failed to fetch categories");
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const data = req.body;
    const slug = data.slug || slugify(data.nameEn);
    const category = await prisma.category.create({ data: { ...data, slug } });
    log.info("Category created", { slug });
    return apiResponse(res, 201, { category }, "Category created");
  } catch (error) {
    return apiError(res, 500, "Failed to create category");
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const data = req.body;
    if (data.nameEn && !data.slug) data.slug = slugify(data.nameEn);
    const category = await prisma.category.update({ where: { id: req.params.id }, data });
    return apiResponse(res, 200, { category }, "Category updated");
  } catch (error) {
    return apiError(res, 500, "Failed to update category");
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    return apiResponse(res, 200, null, "Category deleted");
  } catch (error) {
    return apiError(res, 500, "Failed to delete category");
  }
}
