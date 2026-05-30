"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card",
        hover && "hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardImage({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative aspect-[4/3] overflow-hidden", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2 p-4", className)} {...props} />;
}
