"use client";

import { useLocale, useTranslations } from "next-intl";
import ProductCard from "@/components/shared/ProductCard";

const offerProducts = [
  { id: "1", nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", slug: "modern-wooden-bed", price: 250000, comparePrice: 350000, isOffer: true, isUsed: false, stock: 5, images: [{ url: "/images/placeholder.svg" }] },
  { id: "3", nameEn: "Dining Table", nameAr: "طاولة طعام", slug: "dining-table", price: 180000, comparePrice: 220000, isOffer: true, isUsed: false, stock: 7, images: [{ url: "/images/placeholder.svg" }] },
  { id: "6", nameEn: "Wooden Shelf", nameAr: "رفوف خشبية", slug: "wooden-shelf", price: 65000, comparePrice: 85000, isOffer: true, isUsed: false, stock: 15, images: [{ url: "/images/placeholder.svg" }] },
  { id: "8", nameEn: "Used Desk", nameAr: "مكتب مستعمل", slug: "used-desk", price: 45000, comparePrice: 95000, isOffer: true, isUsed: true, stock: 2, images: [{ url: "/images/placeholder.svg" }] },
];

export default function OffersPage() {
  const t = useTranslations("nav");
  const ct = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">{t("offers")}</h1>
        <p className="section-subtitle mt-2">{ct("offer")}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {offerProducts.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
}
