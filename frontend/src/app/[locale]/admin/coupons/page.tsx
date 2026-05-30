"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Plus, Pencil, Trash2 } from "lucide-react";

const coupons = [
  { id: "1", code: "WELCOME10", discount: 10, type: "PERCENTAGE", uses: 45, maxUses: 100, expires: "2026-12-31", isActive: true },
  { id: "2", code: "SAVE50K", discount: 50000, type: "FIXED", uses: 12, maxUses: 50, expires: "2026-08-15", isActive: true },
];

export default function AdminCoupons() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">{t("coupons")}</h1>
        <Button>
          <Plus className="h-4 w-4" />
          {t("add_coupon")}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-beige">
        <table className="w-full text-sm">
          <thead className="bg-beige/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("code")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("discount")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("type")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("used")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("max_uses")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("expires")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-beige/20">
                <td className="px-4 py-3 font-mono font-medium text-wood">{c.code}</td>
                <td className="px-4 py-3">{c.discount}{c.type === "PERCENTAGE" ? "%" : " SDG"}</td>
                <td className="px-4 py-3">{c.type}</td>
                <td className="px-4 py-3">{c.uses}/{c.maxUses}</td>
                <td className="px-4 py-3">{c.maxUses}</td>
                <td className="px-4 py-3 text-text-muted">{c.expires}</td>
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
