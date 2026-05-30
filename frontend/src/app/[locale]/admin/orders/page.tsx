"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";

const orders = [
  { id: "ORD-001", customer: "Ahmed Ali", total: 420000, status: "PENDING", date: "2026-05-28" },
  { id: "ORD-002", customer: "Sara Omer", total: 250000, status: "SHIPPED", date: "2026-05-27" },
  { id: "ORD-003", customer: "Khaled Hassan", total: 180000, status: "DELIVERED", date: "2026-05-25" },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">{t("orders")}</h1>
      <div className="overflow-x-auto rounded-xl border border-beige">
        <table className="w-full text-sm">
          <thead className="bg-beige/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("order_id")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("customer")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("total")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("status")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("date")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-beige/20">
                <td className="px-4 py-3 font-medium">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3">{o.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[o.status] || ""}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-muted">{o.date}</td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm">{t("view")}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
