"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Plus, Pencil, Trash2 } from "lucide-react";

const products = [
  { id: "1", nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", price: 250000, stock: 5, category: "Bedrooms" },
  { id: "2", nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", price: 420000, stock: 3, category: "Sofas" },
];

export default function AdminProducts() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">{t("products")}</h1>
        <Button>
          <Plus className="h-4 w-4" />
          {t("add_product")}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-beige">
        <table className="w-full text-sm">
          <thead className="bg-beige/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-muted">#</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">EN</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">AR</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("price")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("stock")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("category")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-beige/20">
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3 font-medium">{p.nameEn}</td>
                <td className="px-4 py-3">{p.nameAr}</td>
                <td className="px-4 py-3">{p.price.toLocaleString()}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="sm"><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
