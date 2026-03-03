"use client";
import React, { memo } from "react";
import { clsx } from "clsx";

const variants = {
  primary:
    "bg-[#1E293B] hover:bg-[#334155] text-white shadow-lg shadow-slate-900/20 active:scale-[0.98]",
  secondary:
    "bg-white border-2 border-[#1E293B] text-[#1E293B] hover:bg-[#1E293B] hover:text-white",
  ghost:
    "bg-transparent text-[#1E293B] hover:bg-slate-50",
  danger:
    "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-900/20 active:scale-[0.98]",
  success:
    "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-900/20",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = memo(function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  className = "",
  icon: Icon,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </button>
  );
});

export default Button;
