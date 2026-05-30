"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShoppingCart, DollarSign, Users, Package } from "lucide-react";

const stats = [
  { label: "total_orders", value: "156", icon: ShoppingCart, change: "+12%", color: "bg-blue-500" },
  { label: "total_revenue", value: "45.2M", icon: DollarSign, change: "+8%", color: "bg-green-500" },
  { label: "total_users", value: "2,847", icon: Users, change: "+23%", color: "bg-purple-500" },
  { label: "total_products", value: "1,234", icon: Package, change: "+5%", color: "bg-amber-500" },
];

export default function AdminDashboard() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-text">{t("dashboard")}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="rounded-xl border border-beige bg-white p-5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-xs text-text-muted">{t(stat.label)}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-xl border border-beige bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-text">{t("sales_stats")}</h2>
        <div className="flex h-48 items-center justify-center rounded-lg bg-beige/50 text-text-muted">
          {/* Chart placeholder - will be integrated with real data */}
          <p className="text-sm">{t("sales_stats")}</p>
        </div>
      </div>
    </div>
  );
}
