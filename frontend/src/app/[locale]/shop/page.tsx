"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ProductCard from "@/components/shared/ProductCard";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

const allProducts = [
  { id: "1", nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", slug: "modern-wooden-bed", price: 250000, comparePrice: 350000, isOffer: true, isUsed: false, stock: 5, images: [{ url: "/images/placeholder.svg" }], category: "bedrooms" },
  { id: "2", nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", slug: "elegant-sofa-set", price: 420000, comparePrice: null, isOffer: false, isUsed: false, stock: 3, images: [{ url: "/images/placeholder.svg" }], category: "sofas" },
  { id: "3", nameEn: "Dining Table", nameAr: "طاولة طعام", slug: "dining-table", price: 180000, comparePrice: 220000, isOffer: true, isUsed: false, stock: 7, images: [{ url: "/images/placeholder.svg" }], category: "tables" },
  { id: "4", nameEn: "Office Desk", nameAr: "مكتب عمل", slug: "office-desk", price: 95000, comparePrice: null, isOffer: false, isUsed: false, stock: 10, images: [{ url: "/images/placeholder.svg" }], category: "offices" },
  { id: "5", nameEn: "Kids Bed", nameAr: "سرير أطفال", slug: "kids-bed", price: 120000, comparePrice: null, isOffer: false, isUsed: false, stock: 8, images: [{ url: "/images/placeholder.svg" }], category: "kids" },
  { id: "6", nameEn: "Wooden Shelf", nameAr: "رفوف خشبية", slug: "wooden-shelf", price: 65000, comparePrice: 85000, isOffer: true, isUsed: false, stock: 15, images: [{ url: "/images/placeholder.svg" }], category: "decor" },
  { id: "7", nameEn: "Kitchen Cabinet", nameAr: "خزانة مطبخ", slug: "kitchen-cabinet", price: 310000, comparePrice: null, isOffer: false, isUsed: false, stock: 4, images: [{ url: "/images/placeholder.svg" }], category: "kitchens" },
  { id: "8", nameEn: "Used Desk", nameAr: "مكتب مستعمل", slug: "used-desk", price: 45000, comparePrice: 95000, isOffer: true, isUsed: true, stock: 2, images: [{ url: "/images/placeholder.svg" }], category: "used" },
];

const categories = [
  { value: "", labelEn: "All", labelAr: "الكل" },
  { value: "bedrooms", labelEn: "Bedrooms", labelAr: "غرف النوم" },
  { value: "sofas", labelEn: "Sofas", labelAr: "الكنب" },
  { value: "tables", labelEn: "Tables", labelAr: "الطاولات" },
  { value: "offices", labelEn: "Offices", labelAr: "المكاتب" },
  { value: "kitchens", labelEn: "Kitchens", labelAr: "المطابخ" },
  { value: "decor", labelEn: "Decor", labelAr: "الديكور" },
  { value: "kids", labelEn: "Kids", labelAr: "الأطفال" },
  { value: "used", labelEn: "Used", labelAr: "مستعمل" },
];

export default function ShopPage() {
  const t = useTranslations("shop");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  let filtered = selectedCategory ? allProducts.filter((p) => p.category === selectedCategory) : [...allProducts];
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  if (sortBy === "price_asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price_desc") filtered.sort((a, b) => b.price - a.price);
  else filtered.sort((a, b) => (a.isOffer === b.isOffer ? 0 : a.isOffer ? -1 : 1));

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-text">{t("category")}</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedCategory === cat.value
                  ? "bg-wood/10 font-medium text-wood"
                  : "text-text-muted hover:bg-beige"
              }`}
            >
              {locale === "ar" ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-text">{t("price_range")}</h3>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={500000}
            step={10000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-wood"
          />
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>{priceRange[0].toLocaleString()}</span>
            <span>{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-custom py-8 lg:py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text lg:text-3xl">{t("title")}</h1>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto text-sm"
          >
            <option value="newest">{t("sort_newest")}</option>
            <option value="price_asc">{t("sort_price_asc")}</option>
            <option value="price_desc">{t("sort_price_desc")}</option>
            <option value="popular">{t("sort_popular")}</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-ghost lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <FiltersPanel />
        </aside>

        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
            <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">{t("filter")}</h2>
                <button onClick={() => setShowFilters(false)} className="btn-ghost p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FiltersPanel />
            </div>
          </div>
        )}

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-text-muted">
              <p className="text-lg">{t("no_results")}</p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-text-muted">
                {t("results_count", { count: filtered.length })}
              </p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 lg:gap-5">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard product={product} locale={locale} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
