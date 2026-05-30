"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const ct = useTranslations("common");

  return (
    <footer className="border-t border-beige bg-beige/30">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-wood">TemPer</h3>
            <p className="text-sm leading-relaxed text-text-muted">
              {t.rich("contact_us", { mail: () => "info@temper.sd" })}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-wood/10 text-wood transition-colors hover:bg-wood hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-wood/10 text-wood transition-colors hover:bg-wood hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-text">{t("quick_links")}</h4>
            <ul className="space-y-2.5">
              {["home", "shop", "categories", "offers", "featured", "about", "contact"].map(
                (key) => (
                  <li key={key}>
                    <Link
                      href={key === "home" ? "/" : `/${key}`}
                      className="text-sm text-text-muted transition-colors hover:text-wood"
                    >
                      {t(key)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-text">{t("contact_us")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-wood" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <Phone className="h-4 w-4 shrink-0 text-wood" />
                <span>+249 123 456 789</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <Mail className="h-4 w-4 shrink-0 text-wood" />
                <span>info@temper.sd</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-text">{t("newsletter")}</h4>
            <p className="text-sm text-text-muted">{t("subscribe")}</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder={t("newsletter_placeholder")}
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary shrink-0">
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-beige-dark">
        <div className="container-custom flex flex-col items-center justify-between gap-2 py-6 text-sm text-text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} TemPer. {t("rights")}.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-wood">
              {t("about")}
            </Link>
            <Link href="/contact" className="hover:text-wood">
              {t("contact_us")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
