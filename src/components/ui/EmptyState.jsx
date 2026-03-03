"use client";
import React, { memo } from "react";
import Button from "@/components/ui/Button";

const EmptyState = memo(function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {Icon && (
        <div className="mb-6 p-5 rounded-full bg-slate-50 text-[#1E293B]">
          <Icon className="h-10 w-10" />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 max-w-sm text-sm mb-6">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">{actionLabel}</Button>
      )}
    </div>
  );
});

export default EmptyState;
