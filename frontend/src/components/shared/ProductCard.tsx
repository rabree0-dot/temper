"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import { Card, CardContent } from "@/components/ui";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    price: number;
    comparePrice?: number | null;
    isOffer: boolean;
    isUsed: boolean;
    stock: number;
    images: { url: string }[];
  };
  locale?: string;
}

export default function ProductCard({ product, locale = "ar" }: ProductCardProps) {
  const t = useTranslations("shop");
  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group h-full">
        <div className="relative aspect-square overflow-hidden bg-beige">
          <img
            src={product.images[0]?.url || "/images/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isOffer && (
            <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-medium text-white">
              {t("offer")}
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-text">
                {t("sold_out")}
              </span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-text-muted opacity-0 shadow-sm backdrop-blur-sm transition-all hover:text-red-500 group-hover:opacity-100"
            aria-label={t("add_to_wishlist")}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <CardContent>
          <h3 className="line-clamp-1 text-sm font-medium text-text">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-wood">
              {product.price.toLocaleString()} {t("sar")}
            </span>
            {hasDiscount && (
              <span className="text-sm text-text-muted line-through">
                {product.comparePrice?.toLocaleString()} {t("sar")}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
