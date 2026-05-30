"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";

const users = [
  { id: "1", name: "Ahmed Ali", email: "ahmed@example.com", role: "USER", orders: 5, joined: "2026-01-15" },
  { id: "2", name: "Sara Omer", email: "sara@example.com", role: "ADMIN", orders: 12, joined: "2025-11-20" },
  { id: "3", name: "Khaled Hassan", email: "khaled@example.com", role: "USER", orders: 3, joined: "2026-03-10" },
];

export default function AdminUsers() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">{t("users")}</h1>
      <div className="overflow-x-auto rounded-xl border border-beige">
        <table className="w-full text-sm">
          <thead className="bg-beige/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-muted">#</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("name")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("email")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("role")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("orders")}</th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">{t("joined")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-beige/20">
                <td className="px-4 py-3">{u.id}</td>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-text-muted">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                    u.role === "ADMIN" ? "bg-wood/10 text-wood" : "bg-beige-dark text-text-muted"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">{u.orders}</td>
                <td className="px-4 py-3 text-text-muted">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
