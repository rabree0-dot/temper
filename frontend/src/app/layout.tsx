import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TemPer | أثاث فاخر",
  description: "متجر تمبر للأثاث الفاخر في السودان",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
