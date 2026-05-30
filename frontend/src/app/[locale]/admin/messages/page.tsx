"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Mail, Trash2 } from "lucide-react";

const messages = [
  { id: "1", name: "Omar Babiker", email: "omar@example.com", subject: "استفسار عن الأثاث", message: "أريد معلومات عن غرف النوم", isRead: false, date: "2026-05-29" },
  { id: "2", name: "Nada Ibrahim", email: "nada@example.com", subject: "طلب توصيل", message: "هل توصلون إلى ولاية الجزيرة؟", isRead: true, date: "2026-05-28" },
];

export default function AdminMessages() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">{t("messages")}</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-4 transition-colors ${
              m.isRead ? "border-beige bg-white" : "border-wood/20 bg-wood/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-text">{m.name}</h3>
                  {!m.isRead && <span className="h-2 w-2 rounded-full bg-wood" />}
                </div>
                <p className="mt-0.5 text-xs text-text-muted">{m.email} &middot; {m.date}</p>
                <p className="mt-2 text-sm text-text">{m.subject}</p>
                <p className="mt-1 text-sm text-text-muted line-clamp-2">{m.message}</p>
              </div>
              <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-400" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
