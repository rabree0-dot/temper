"use client";

import { useTranslations, useLocale } from "next-intl";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import { Heart, Share2, Minus, Plus, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "@/routing";

const product = {
  id: "1",
  nameEn: "Modern Wooden Bed",
  nameAr: "سرير خشبي عصري",
  slug: "modern-wooden-bed",
  price: 250000,
  comparePrice: 350000,
  descriptionEn:
    "A stunning modern wooden bed crafted from high-quality solid wood. Features a sleek minimalist design with warm natural finishes. Perfect for contemporary bedrooms.",
  descriptionAr:
    "سرير خشبي عصري أنيق مصنوع من الخشب الصلب عالي الجودة. يتميز بتصميم بسيط وأنيق مع لمسات خشبية دافئة. مثالي لغرف النوم العصرية.",
  isOffer: true,
  isUsed: false,
  stock: 5,
  images: [
    { url: "/images/placeholder.svg", id: "1" },
    { url: "/images/placeholder.svg", id: "2" },
  ],
  category: { nameEn: "Bedrooms", nameAr: "غرف النوم", slug: "bedrooms" },
};

const relatedProducts = [
  { id: "2", nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", slug: "elegant-sofa-set", price: 420000, comparePrice: null, isOffer: false, isUsed: false, stock: 3, images: [{ url: "/images/placeholder.svg" }] },
  { id: "3", nameEn: "Dining Table", nameAr: "طاولة طعام", slug: "dining-table", price: 180000, comparePrice: 220000, isOffer: true, isUsed: false, stock: 7, images: [{ url: "/images/placeholder.svg" }] },
  { id: "4", nameEn: "Office Desk", nameAr: "مكتب عمل", slug: "office-desk", price: 95000, comparePrice: null, isOffer: false, isUsed: false, stock: 10, images: [{ url: "/images/placeholder.svg" }] },
];

export default function ProductDetailPage() {
  const t = useTranslations("product");
  const ct = useTranslations("common");
  const locale = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const desc = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  const catName = locale === "ar" ? product.category.nameAr : product.category.nameEn;

  return (
    <div className="container-custom py-8 lg:py-12">
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-wood">{ct("home")}</Link>
        <ChevronRight className="h-3 w-3 rtl-flip" />
        <Link href="/shop" className="hover:text-wood">{ct("shop")}</Link>
        <ChevronRight className="h-3 w-3 rtl-flip" />
        <span className="text-text">{name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-beige">
            <img
              src={product.images[selectedImage]?.url || "/images/placeholder.svg"}
              alt={name}
              className="h-full w-full object-cover"
            />
            {product.isOffer && (
              <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
                {ct("offer")}
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === selectedImage ? "border-wood" : "border-transparent"
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-wood"
            >
              {catName}
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-text lg:text-3xl">{name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-wood">
              {product.price.toLocaleString()} {ct("sar")}
            </span>
            {product.comparePrice && (
              <span className="text-lg text-text-muted line-through">
                {product.comparePrice.toLocaleString()} {ct("sar")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
            <span className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
              {product.stock > 0 ? t("in_stock") : t("out_of_stock")}
            </span>
            {product.stock > 0 && (
              <span className="text-text-muted">({product.stock} {ct("quantity")})</span>
            )}
          </div>

          <p className="leading-relaxed text-text-muted">{desc}</p>

          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-beige-dark">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:bg-beige"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-12 items-center justify-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:bg-beige"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button size="lg" className="flex-1">
                {t("add_to_cart")}
              </Button>
            </div>
          )}

          <div className="flex gap-3 border-t border-beige pt-6">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4" />
              {t("wishlist")}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
              {t("share")}
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="section-title mb-6">{t("related")}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {relatedProducts.map((rp) => (
            <ProductCard key={rp.id} product={rp} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
