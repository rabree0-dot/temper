"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/routing";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  MessageSquare,
  TicketPercent,
  LogOut,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "products", icon: Package },
  { href: "/admin/categories", label: "categories", icon: Tags },
  { href: "/admin/orders", label: "orders", icon: ShoppingCart },
  { href: "/admin/users", label: "users", icon: Users },
  { href: "/admin/messages", label: "messages", icon: MessageSquare },
  { href: "/admin/coupons", label: "coupons", icon: TicketPercent },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("admin");
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      <aside className="hidden w-64 shrink-0 border-l border-beige bg-beige/30 lg:block">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-wood text-white"
                      : "text-text-muted hover:bg-beige-dark hover:text-text"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t(link.label)}
                </Link>
              );
            })}
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-beige-dark hover:text-text"
          >
            <LogOut className="h-4 w-4" />
            {t("back_to_store")}
          </Link>
        </div>
      </aside>

      <div className="flex-1 overflow-auto p-6 lg:p-8">{children}</div>
    </div>
  );
}
