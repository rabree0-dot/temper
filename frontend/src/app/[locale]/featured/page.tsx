"use client";

import { useLocale, useTranslations } from "next-intl";
import ProductCard from "@/components/shared/ProductCard";

const featuredProducts = [
  { id: "1", nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", slug: "modern-wooden-bed", price: 250000, comparePrice: 350000, isOffer: true, isUsed: false, stock: 5, images: [{ url: "/images/placeholder.svg" }] },
  { id: "2", nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", slug: "elegant-sofa-set", price: 420000, comparePrice: null, isOffer: false, isUsed: false, stock: 3, images: [{ url: "/images/placeholder.svg" }] },
  { id: "4", nameEn: "Office Desk", nameAr: "مكتب عمل", slug: "office-desk", price: 95000, comparePrice: null, isOffer: false, isUsed: false, stock: 10, images: [{ url: "/images/placeholder.svg" }] },
  { id: "5", nameEn: "Kids Bed", nameAr: "سرير أطفال", slug: "kids-bed", price: 120000, comparePrice: null, isOffer: false, isUsed: false, stock: 8, images: [{ url: "/images/placeholder.svg" }] },
  { id: "7", nameEn: "Kitchen Cabinet", nameAr: "خزانة مطبخ", slug: "kitchen-cabinet", price: 310000, comparePrice: null, isOffer: false, isUsed: false, stock: 4, images: [{ url: "/images/placeholder.svg" }] },
];

export default function FeaturedPage() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">{t("featured")}</h1>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
}
