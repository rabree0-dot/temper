"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import { Button, Input } from "@/components/ui";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="container-custom flex min-h-[calc(100vh-200px)] items-center justify-center py-8">
      <motion.div
        className="w-full max-w-md space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text">{t("register_title")}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label={t("name")}
            placeholder={t("name")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label={t("email")}
            type="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label={t("phone")}
            type="tel"
            placeholder="+249 912 345 678"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label={t("password")}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Input
            label={t("confirm_password")}
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
          <Button type="submit" size="lg" className="w-full">
            <UserPlus className="h-4 w-4" />
            {t("register_btn")}
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          {t("has_account")}{" "}
          <Link href="/login" className="font-medium text-wood hover:underline">
            {t("login_here")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
