"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    image?: string | null;
  };
  locale?: string;
  className?: string;
}

export default function CategoryCard({ category, locale = "ar", className }: CategoryCardProps) {
  const name = locale === "ar" ? category.nameAr : category.nameEn;

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className={cn(
        "group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl bg-beige",
        className
      )}
    >
      <img
        src={category.image || "/images/placeholder.svg"}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="relative w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
    </Link>
  );
}
