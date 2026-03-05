"use client";
import React, { memo, useCallback } from "react";
import { CalendarDays, AlertCircle } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const today = new Date().toISOString().split("T")[0];

const DateRangePicker = memo(function DateRangePicker({ onDatesValid }) {
  const { dateRange, setDateRange } = useBooking();
  const { startDate, endDate } = dateRange;

  const handleStartChange = useCallback(
    (e) => {
      const val = e.target.value;
      setDateRange((prev) => ({
        ...prev,
        startDate: val,
        endDate: prev.endDate && prev.endDate <= val ? "" : prev.endDate,
      }));
    },
    [setDateRange]
  );

  const handleEndChange = useCallback(
    (e) => {
      setDateRange((prev) => ({ ...prev, endDate: e.target.value }));
      if (startDate && e.target.value > startDate && onDatesValid) {
        onDatesValid({ startDate, endDate: e.target.value });
      }
    },
    [setDateRange, startDate, onDatesValid]
  );

  const nights =
    startDate && endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-[#1E293B]" />
        Select Your Dates
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <input
            type="date"
            id="checkin-date"
            value={startDate}
            min={today}
            onChange={handleStartChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <input
            type="date"
            id="checkout-date"
            value={endDate}
            min={startDate || today}
            disabled={!startDate}
            onChange={handleEndChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
      </div>

      {nights > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-[#1E293B]">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm font-medium">
            {nights} {nights === 1 ? "night" : "nights"} selected
          </span>
        </div>
      )}

      {startDate && endDate && endDate <= startDate && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Check-out must be after check-in.
        </div>
      )}
    </div>
  );
});

export default DateRangePicker;
