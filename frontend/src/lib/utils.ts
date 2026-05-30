import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-SD", {
    style: "currency",
    currency: "SDG",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("ar-SD", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
