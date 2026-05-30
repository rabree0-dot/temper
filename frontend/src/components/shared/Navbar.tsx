"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/routing";
import { cn } from "@/lib/utils";
import { Menu, X, Search, Heart, ShoppingBag, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/shop", key: "shop" },
  { href: "/categories", key: "categories" },
  { href: "/offers", key: "offers" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && (segments[0] === "en" || segments[0] === "ar")) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    router.push(`/${segments.join("/")}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-beige bg-white/95 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="text-xl font-bold tracking-tight text-wood lg:text-2xl">
            TemPer
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-wood/10 text-wood"
                    : "text-text-muted hover:bg-beige hover:text-text"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="btn-ghost rounded-full p-2"
              aria-label={t("search")}
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/wishlist"
              className="btn-ghost rounded-full p-2"
              aria-label={t("wishlist")}
            >
              <Heart className="h-5 w-5" />
            </Link>

            <button
              onClick={switchLocale}
              className="btn-ghost rounded-full px-3 py-1.5 text-xs font-medium"
            >
              {t("language")}
            </button>

            <Link href="/login" className="btn-primary hidden text-sm md:inline-flex">
              {t("login")}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-ghost rounded-full p-2 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fadeIn border-t border-beige bg-white lg:hidden">
          <div className="container-custom space-y-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-wood/10 text-wood"
                    : "text-text-muted hover:bg-beige"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-4 block text-center"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
