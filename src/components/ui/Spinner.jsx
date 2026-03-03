"use client";
import React, { memo } from "react";
import { clsx } from "clsx";

const Spinner = memo(function Spinner({ size = "md", className = "" }) {
  const sizes = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-2 border-[#1E293B]/20 border-t-[#1E293B]",
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
});

export default Spinner;
