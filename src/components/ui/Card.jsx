"use client";
import React, { memo } from "react";
import { clsx } from "clsx";

const Card = memo(function Card({
  children,
  className = "",
  hover = false,
  variant = "white", // Add variant prop with a default
  ...props
}) {
  const colors = {
    rose: "bg-slate-50 border-slate-100", // Updated rose to slate
    emerald: "bg-emerald-50 border-emerald-100",
    white: "bg-white border-gray-100",
  }[variant] || "bg-white border-gray-100"; // Fallback to white if variant is unknown

  return (
    <div
      className={clsx(
        colors, // Apply colors based on variant
        "shadow-sm",
        hover &&
          "transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1 cursor-pointer", // Updated shadow color to slate
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;
