"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input } from "@/components/ui";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container-custom py-8 lg:py-16">
      <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">{t("title")}</h1>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="space-y-4">
            {[
              { icon: MapPin, label: t("address") },
              { icon: Phone, label: "+249 123 456 789" },
              { icon: Mail, label: "info@temper.sd" },
              { icon: Clock, label: t("working_hours") },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-wood/10">
                  <item.icon className="h-5 w-5 text-wood" />
                </div>
                <span className="text-sm text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-beige py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-lg font-medium text-text">{t("success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={t("phone")}
                  type="tel"
                  placeholder="+249 912 345 678"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  label={t("subject")}
                  placeholder={t("subject")}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text">{t("message")}</label>
                <textarea
                  className="input-field min-h-[120px] resize-none"
                  placeholder={t("message")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="h-4 w-4" />
                {t("send")}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
