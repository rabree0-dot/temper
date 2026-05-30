"use client";

import { useTranslations, useLocale } from "next-intl";
import ProductCard from "@/components/shared/ProductCard";

const wishlisted = [
  { id: "1", nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", slug: "modern-wooden-bed", price: 250000, comparePrice: 350000, isOffer: true, isUsed: false, stock: 5, images: [{ url: "/images/placeholder.svg" }] },
  { id: "2", nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", slug: "elegant-sofa-set", price: 420000, comparePrice: null, isOffer: false, isUsed: false, stock: 3, images: [{ url: "/images/placeholder.svg" }] },
];

export default function WishlistPage() {
  const t = useTranslations("nav");
  const ct = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="container-custom py-8 lg:py-12">
      <h1 className="section-title mb-8">{t("wishlist")}</h1>
      {wishlisted.length === 0 ? (
        <div className="py-20 text-center text-text-muted">{ct("no_results")}</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {wishlisted.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
