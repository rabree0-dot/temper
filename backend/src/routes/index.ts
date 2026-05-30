import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { validate } from "../middleware/validate.middleware";

import * as authController from "../controllers/auth.controller";
import * as productController from "../controllers/product.controller";
import * as categoryController from "../controllers/category.controller";
import * as orderController from "../controllers/order.controller";
import * as userController from "../controllers/user.controller";
import * as couponController from "../controllers/coupon.controller";
import * as messageController from "../controllers/message.controller";
import * as uploadController from "../controllers/upload.controller";
import * as wishlistController from "../controllers/wishlist.controller";
import * as reviewController from "../controllers/review.controller";
import * as adminController from "../controllers/admin.controller";

import { registerSchema, loginSchema } from "../validators/auth.schema";
import { createProductSchema, updateProductSchema } from "../validators/product.schema";
import { createCategorySchema, updateCategorySchema } from "../validators/category.schema";
import { createOrderSchema, updateOrderStatusSchema } from "../validators/order.schema";
import { createCouponSchema, updateCouponSchema } from "../validators/coupon.schema";

const router = Router();

router.get("/health", (_req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

router.post("/auth/register", validate(registerSchema), authController.register);
router.post("/auth/login", validate(loginSchema), authController.login);
router.get("/auth/me", authMiddleware, authController.getMe);

router.get("/products", productController.getProducts);
router.get("/products/featured", (req, res) => { req.query = { ...req.query, featured: "true" } as any; productController.getProducts(req, res); });
router.get("/products/offers", (req, res) => { req.query = { ...req.query, isOffer: "true" } as any; productController.getProducts(req, res); });
router.get("/products/:slug", productController.getProductBySlug);
router.post("/products", authMiddleware, adminMiddleware, validate(createProductSchema), productController.createProduct);
router.put("/products/:id", authMiddleware, adminMiddleware, validate(updateProductSchema), productController.updateProduct);
router.delete("/products/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

router.get("/categories", categoryController.getCategories);
router.post("/categories", authMiddleware, adminMiddleware, validate(createCategorySchema), categoryController.createCategory);
router.put("/categories/:id", authMiddleware, adminMiddleware, validate(updateCategorySchema), categoryController.updateCategory);
router.delete("/categories/:id", authMiddleware, adminMiddleware, categoryController.deleteCategory);

router.post("/orders", authMiddleware, validate(createOrderSchema), orderController.createOrder);
router.get("/orders", authMiddleware, orderController.getOrders);
router.put("/orders/:id/status", authMiddleware, adminMiddleware, validate(updateOrderStatusSchema), orderController.updateOrderStatus);

router.get("/users", authMiddleware, adminMiddleware, userController.getUsers);

router.post("/coupons", authMiddleware, adminMiddleware, validate(createCouponSchema), couponController.createCoupon);
router.get("/coupons", authMiddleware, adminMiddleware, couponController.getCoupons);
router.put("/coupons/:id", authMiddleware, adminMiddleware, validate(updateCouponSchema), couponController.updateCoupon);
router.delete("/coupons/:id", authMiddleware, adminMiddleware, couponController.deleteCoupon);

router.post("/messages", messageController.createMessage);
router.get("/messages", authMiddleware, adminMiddleware, messageController.getMessages);
router.put("/messages/:id/read", authMiddleware, adminMiddleware, messageController.markAsRead);
router.delete("/messages/:id", authMiddleware, adminMiddleware, messageController.deleteMessage);

router.post("/upload", authMiddleware, adminMiddleware, upload.single("image"), uploadController.uploadImage);
router.delete("/upload/:publicId", authMiddleware, adminMiddleware, uploadController.deleteImage);

router.get("/wishlist", authMiddleware, wishlistController.getWishlist);
router.post("/wishlist", authMiddleware, wishlistController.addToWishlist);
router.delete("/wishlist/:productId", authMiddleware, wishlistController.removeFromWishlist);

router.post("/reviews", authMiddleware, reviewController.createReview);
router.get("/reviews/:productId", reviewController.getProductReviews);

router.get("/admin/stats", authMiddleware, adminMiddleware, adminController.getStats);

export default router;
