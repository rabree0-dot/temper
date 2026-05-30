"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/routing";
import { motion } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard";
import CategoryCard from "@/components/shared/CategoryCard";
import { ArrowRight, Shield, Truck, HeadphonesIcon } from "lucide-react";

const sampleProducts = [
  { id: "1", nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", slug: "modern-wooden-bed", price: 250000, comparePrice: 350000, isOffer: true, isUsed: false, stock: 5, images: [{ url: "/images/placeholder.svg" }] },
  { id: "2", nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", slug: "elegant-sofa-set", price: 420000, comparePrice: null, isOffer: false, isUsed: false, stock: 3, images: [{ url: "/images/placeholder.svg" }] },
  { id: "3", nameEn: "Dining Table", nameAr: "طاولة طعام", slug: "dining-table", price: 180000, comparePrice: 220000, isOffer: true, isUsed: false, stock: 7, images: [{ url: "/images/placeholder.svg" }] },
  { id: "4", nameEn: "Office Desk", nameAr: "مكتب عمل", slug: "office-desk", price: 95000, comparePrice: null, isOffer: false, isUsed: false, stock: 10, images: [{ url: "/images/placeholder.svg" }] },
  { id: "5", nameEn: "Kids Bed", nameAr: "سرير أطفال", slug: "kids-bed", price: 120000, comparePrice: null, isOffer: false, isUsed: false, stock: 8, images: [{ url: "/images/placeholder.svg" }] },
  { id: "6", nameEn: "Wooden Shelf", nameAr: "رفوف خشبية", slug: "wooden-shelf", price: 65000, comparePrice: 85000, isOffer: true, isUsed: false, stock: 15, images: [{ url: "/images/placeholder.svg" }] },
];

const sampleCategories = [
  { id: "1", nameEn: "Bedrooms", nameAr: "غرف النوم", slug: "bedrooms", image: "/images/placeholder.svg" },
  { id: "2", nameEn: "Sofas", nameAr: "الكنب", slug: "sofas", image: "/images/placeholder.svg" },
  { id: "3", nameEn: "Tables", nameAr: "الطاولات", slug: "tables", image: "/images/placeholder.svg" },
  { id: "4", nameEn: "Offices", nameAr: "المكاتب", slug: "offices", image: "/images/placeholder.svg" },
  { id: "5", nameEn: "Kitchens", nameAr: "المطابخ", slug: "kitchens", image: "/images/placeholder.svg" },
  { id: "6", nameEn: "Decor", nameAr: "الديكور", slug: "decor", image: "/images/placeholder.svg" },
  { id: "7", nameEn: "Kids", nameAr: "الأطفال", slug: "kids", image: "/images/placeholder.svg" },
  { id: "8", nameEn: "Used Furniture", nameAr: "أثاث مستعمل", slug: "used", image: "/images/placeholder.svg" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const t = useTranslations("home");
  const ct = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="space-y-16 pb-16 lg:space-y-24 lg:pb-24">

      <section className="relative overflow-hidden bg-beige">
        <div className="container-custom relative z-10 py-16 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              className="text-3xl font-bold tracking-tight text-text md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t("hero_title")}
            </motion.h1>
            <motion.p
              className="mt-4 text-base text-text-muted md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {t("hero_subtitle")}
            </motion.p>
            <motion.div
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link href="/shop" className="btn-primary text-base">
                {t("hero_cta")}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
              <Link href="/categories" className="btn-outline text-base">
                {t("featured_categories")}
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-wood/5 to-transparent" />
      </section>

      <section className="container-custom">
        <motion.div className="mb-8 text-center" {...fadeUp}>
          <h2 className="section-title">{t("featured_categories")}</h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {sampleCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <CategoryCard category={cat} locale={locale} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-beige/50 py-16 lg:py-24">
        <div className="container-custom">
          <motion.div className="mb-8 flex items-center justify-between" {...fadeUp}>
            <h2 className="section-title">{t("best_sellers")}</h2>
            <Link href="/shop" className="btn-ghost text-sm font-medium text-wood">
              {ct("view_all")}
              <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {sampleProducts.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ProductCard product={product} locale={locale} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom">
        <motion.div className="mb-8 flex items-center justify-between" {...fadeUp}>
          <h2 className="section-title">{t("special_offers")}</h2>
          <Link href="/offers" className="btn-ghost text-sm font-medium text-wood">
            {ct("view_all")}
            <ArrowRight className="h-4 w-4 rtl-flip" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {sampleProducts.filter((p) => p.isOffer).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProductCard product={product} locale={locale} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-wood/5 py-16 lg:py-24">
        <div className="container-custom">
          <motion.div className="mb-12 text-center" {...fadeUp}>
            <h2 className="section-title">{t("why_us")}</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: t("quality"), desc: t("quality_desc") },
              { icon: Truck, title: t("delivery"), desc: t("delivery_desc") },
              { icon: HeadphonesIcon, title: t("support"), desc: t("support_desc") },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-wood/10">
                  <item.icon className="h-6 w-6 text-wood" />
                </div>
                <h3 className="mb-2 font-semibold text-text">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
