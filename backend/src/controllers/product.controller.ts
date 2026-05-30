import { Request, Response } from "express";
import { prisma } from "../config/database";
import { slugify } from "../utils/slug";
import { apiResponse, apiError } from "../utils/api-response";
import { log } from "../utils/logger";

export async function getProducts(req: Request, res: Response) {
  try {
    const { category, search, minPrice, maxPrice, sort, page = "1", limit = "12" } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const where: any = { isActive: true };

    if (category) where.category = { slug: category as string };
    if (search) {
      where.OR = [
        { nameEn: { contains: search as string, mode: "insensitive" } },
        { nameAr: { contains: search as string } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    else if (sort === "price_desc") orderBy = { price: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { images: { take: 1, orderBy: { order: "asc" } }, category: true },
        orderBy,
        skip,
        take: parseInt(limit as string),
      }),
      prisma.product.count({ where }),
    ]);

    return apiResponse(res, 200, { products, total, page: parseInt(page as string), totalPages: Math.ceil(total / parseInt(limit as string)) });
  } catch (error) {
    log.error("Failed to fetch products", error);
    return apiError(res, 500, "Failed to fetch products");
  }
}

export async function getProductBySlug(req: Request, res: Response) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { images: { orderBy: { order: "asc" } }, category: true, reviews: { include: { user: { select: { name: true } } } } },
    });

    if (!product) return apiError(res, 404, "Product not found");
    return apiResponse(res, 200, { product });
  } catch (error) {
    log.error("Failed to fetch product", error);
    return apiError(res, 500, "Failed to fetch product");
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const data = req.body;
    const slug = data.slug || slugify(data.nameEn);
    const product = await prisma.product.create({
      data: { ...data, slug },
      include: { images: true, category: true },
    });
    log.info("Product created", { slug });
    return apiResponse(res, 201, { product }, "Product created");
  } catch (error) {
    log.error("Failed to create product", error);
    return apiError(res, 500, "Failed to create product");
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.nameEn && !data.slug) data.slug = slugify(data.nameEn);

    const product = await prisma.product.update({
      where: { id },
      data,
      include: { images: true, category: true },
    });
    return apiResponse(res, 200, { product }, "Product updated");
  } catch (error) {
    log.error("Failed to update product", error);
    return apiError(res, 500, "Failed to update product");
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    return apiResponse(res, 200, null, "Product deleted");
  } catch (error) {
    log.error("Failed to delete product", error);
    return apiError(res, 500, "Failed to delete product");
  }
}
