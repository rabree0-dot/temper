"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="container-custom py-8 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t("title")}
        </motion.h1>
        <motion.p
          className="mt-2 text-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
        <motion.div
          className="overflow-hidden rounded-xl bg-beige"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src="/images/placeholder.svg" alt="About TemPer" className="h-full w-full object-cover" />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="leading-relaxed text-text-muted">{t("story")}</p>
          <p className="leading-relaxed text-text-muted">{t("mission")}</p>
        </motion.div>
      </div>
    </div>
  );
}
