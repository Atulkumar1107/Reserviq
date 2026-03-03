"use client";
import React, { memo } from "react";
import { clsx } from "clsx";

const Input = memo(function Input({
  label,
  error,
  icon: Icon,
  className = "",
  id,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-4 w-4" />
          </span>
        )}
        <input
          id={id}
          className={clsx(
            "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B]",
            Icon && "pl-10",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
});

export default Input;
