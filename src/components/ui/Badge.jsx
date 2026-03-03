"use client";
import React, { memo } from "react";
import { clsx } from "clsx";

const variants = {
  available: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  booked: "bg-red-100 text-red-700 border border-red-200",
  confirmed: "bg-blue-100 text-blue-700 border border-blue-200",
  cancelled: "bg-gray-100 text-gray-500 border border-gray-200",
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
  Suite: "bg-purple-100 text-purple-700 border border-purple-200",
  Deluxe: "bg-slate-100 text-slate-700 border border-slate-200",
  Double: "bg-sky-100 text-sky-700 border border-sky-200",
  Single: "bg-teal-100 text-teal-700 border border-teal-200",
};

const Badge = memo(function Badge({ variant = "available", children, className = "" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant] ?? "bg-gray-100 text-gray-600",
        className
      )}
    >
      {children}
    </span>
  );
});

export default Badge;
