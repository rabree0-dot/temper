"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Plus, Pencil, Trash2 } from "lucide-react";

const categories = [
  { id: "1", nameEn: "Bedrooms", nameAr: "غرف النوم", slug: "bedrooms", products: 45 },
  { id: "2", nameEn: "Sofas", nameAr: "الكنب", slug: "sofas", products: 28 },
];

export default function AdminCategories() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">{t("categories")}</h1>
        <Button>
          <Plus className="h-4 w-4" />
          {t("add_category")}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-beige">
        <table className="w-full text-sm">
          <thead className="bg-beige/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-muted">#</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">EN</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">AR</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("slug")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("products")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-beige/20">
                <td className="px-4 py-3">{c.id}</td>
                <td className="px-4 py-3 font-medium">{c.nameEn}</td>
                <td className="px-4 py-3">{c.nameAr}</td>
                <td className="px-4 py-3 text-text-muted">{c.slug}</td>
                <td className="px-4 py-3">{c.products}</td>
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
