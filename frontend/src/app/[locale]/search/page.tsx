"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ProductCard from "@/components/shared/ProductCard";
import { Search as SearchIcon } from "lucide-react";

const allProducts = [
  { id: "1", nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", slug: "modern-wooden-bed", price: 250000, comparePrice: 350000, isOffer: true, isUsed: false, stock: 5, images: [{ url: "/images/placeholder.svg" }] },
  { id: "2", nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", slug: "elegant-sofa-set", price: 420000, comparePrice: null, isOffer: false, isUsed: false, stock: 3, images: [{ url: "/images/placeholder.svg" }] },
  { id: "3", nameEn: "Dining Table", nameAr: "طاولة طعام", slug: "dining-table", price: 180000, comparePrice: 220000, isOffer: true, isUsed: false, stock: 7, images: [{ url: "/images/placeholder.svg" }] },
  { id: "4", nameEn: "Office Desk", nameAr: "مكتب عمل", slug: "office-desk", price: 95000, comparePrice: null, isOffer: false, isUsed: false, stock: 10, images: [{ url: "/images/placeholder.svg" }] },
];

export default function SearchPage() {
  const t = useTranslations("common");
  const ct = useTranslations("shop");
  const locale = useLocale();
  const [query, setQuery] = useState("");

  const results = query
    ? allProducts.filter((p) => {
        const q = query.toLowerCase();
        return p.nameEn.toLowerCase().includes(q) || p.nameAr.includes(q);
      })
    : [];

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="input-field h-14 pl-12 pr-4 text-lg"
            autoFocus
          />
        </div>
      </div>

      <div className="mt-8">
        {query && (
          <p className="mb-4 text-sm text-text-muted">
            {ct("results_count", { count: results.length })}
          </p>
        )}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : query ? (
          <div className="py-20 text-center text-text-muted">{ct("no_results")}</div>
        ) : null}
      </div>
    </div>
  );
}
