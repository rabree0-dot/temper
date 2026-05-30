"use client";

import { useLocale, useTranslations } from "next-intl";
import CategoryCard from "@/components/shared/CategoryCard";

const categories = [
  { id: "1", nameEn: "Bedrooms", nameAr: "غرف النوم", slug: "bedrooms" },
  { id: "2", nameEn: "Sofas", nameAr: "الكنب", slug: "sofas" },
  { id: "3", nameEn: "Tables", nameAr: "الطاولات", slug: "tables" },
  { id: "4", nameEn: "Offices", nameAr: "المكاتب", slug: "offices" },
  { id: "5", nameEn: "Kitchens", nameAr: "المطابخ", slug: "kitchens" },
  { id: "6", nameEn: "Library Furniture", nameAr: "الأثاث المكتبي", slug: "library" },
  { id: "7", nameEn: "Decor", nameAr: "الديكور", slug: "decor" },
  { id: "8", nameEn: "Used Furniture", nameAr: "الأثاث المستعمل", slug: "used" },
  { id: "9", nameEn: "Kids Furniture", nameAr: "أثاث الأطفال", slug: "kids" },
];

export default function CategoriesPage() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">{t("categories")}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={{ ...cat, image: "/images/placeholder.svg" }}
            locale={locale}
            className="aspect-square"
          />
        ))}
      </div>
    </div>
  );
}
