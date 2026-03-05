"use client";
import React, { useCallback } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { roomTypes, priceRanges } from "@/data/roomsData";
import { useBooking } from "@/context/BookingContext";
import Button from "@/components/ui/Button";

export default function RoomFilters() {
  const { filters, updateFilters, fetchRooms } = useBooking();

  const handleTypeChange = useCallback(
    (type) => {
      const newFilters = { ...filters, type };
      updateFilters({ type });
      fetchRooms(newFilters);
    },
    [filters, updateFilters, fetchRooms]
  );

  const handlePriceChange = useCallback(
    (e) => {
      const idx = Number(e.target.value);
      const range = priceRanges[idx];
      const newFilters = {
        ...filters,
        maxPrice: range.max === Infinity ? null : range.max,
        minPrice: range.min,
      };
      updateFilters({ maxPrice: newFilters.maxPrice, minPrice: newFilters.minPrice });
      fetchRooms(newFilters);
    },
    [filters, updateFilters, fetchRooms]
  );

  const handleCapacityChange = useCallback(
    (e) => {
      const val = e.target.value ? Number(e.target.value) : null;
      const newFilters = { ...filters, minCapacity: val };
      updateFilters({ minCapacity: val });
      fetchRooms(newFilters);
    },
    [filters, updateFilters, fetchRooms]
  );

  const handleReset = useCallback(() => {
    updateFilters({ type: "All", maxPrice: null, minPrice: 0, minCapacity: null });
    fetchRooms({ type: "All", maxPrice: null, minCapacity: null });
  }, [updateFilters, fetchRooms]);

  const isFiltered =
    filters.type !== "All" || filters.maxPrice || filters.minCapacity;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex flex-wrap gap-4 items-center">
      <SlidersHorizontal className="h-5 w-5 text-[#1E293B] shrink-0" />

      <div className="flex flex-wrap gap-2">
        {roomTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              filters.type === type
                ? "bg-[#1E293B] text-white border-[#1E293B] shadow"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#1E293B] hover:text-[#1E293B]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 whitespace-nowrap">Price:</label>
        <select
          id="price-filter"
          onChange={handlePriceChange}
          defaultValue={0}
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
        >
          {priceRanges.map((r, i) => (
            <option key={r.label} value={i}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 whitespace-nowrap">Guests:</label>
        <select
          id="capacity-filter"
          onChange={handleCapacityChange}
          defaultValue=""
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}+
            </option>
          ))}
        </select>
      </div>

      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          icon={X}
          onClick={handleReset}
          className="ml-auto"
        >
          Reset
        </Button>
      )}
    </div>
  );
}
