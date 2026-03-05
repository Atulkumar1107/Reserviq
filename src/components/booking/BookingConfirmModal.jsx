"use client";
import React from "react";
import { CalendarDays, Users, BedDouble, CheckCircle2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useBooking } from "@/context/BookingContext";

export default function BookingConfirmModal({ isOpen, onClose, onConfirm }) {
  const { selectedRoom, dateRange, guests, bookingLoading } = useBooking();

  if (!selectedRoom) return null;

  const nights =
    dateRange.startDate && dateRange.endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(dateRange.endDate) - new Date(dateRange.startDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = nights * selectedRoom.price;

  const fmt = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Your Booking">
 
      <div className="flex gap-4 items-center mb-6 p-4 bg-slate-50 rounded-2xl">
        <img
          src={selectedRoom.image}
          alt={selectedRoom.name}
          className="h-16 w-20 object-cover rounded-xl shrink-0"
        />
        <div>
          <p className="font-bold text-gray-900 text-base leading-snug">
            {selectedRoom.name}
          </p>
          <p className="text-sm text-gray-500">{selectedRoom.type} Room</p>
        </div>
      </div>

 
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <CalendarDays className="h-4 w-4 text-[#1E293B]" />
          <span>
            {fmt(dateRange.startDate)} → {fmt(dateRange.endDate)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <BedDouble className="h-4 w-4 text-[#1E293B]" />
          <span>
            {nights} {nights === 1 ? "night" : "nights"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <Users className="h-4 w-4 text-[#1E293B]" />
          <span>
            {guests} {guests === 1 ? "guest" : "guests"}
          </span>
        </div>
      </div>

    
      <div className="border-t border-gray-100 pt-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            ₹{selectedRoom.price.toLocaleString()} × {nights} nights
          </span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 text-base">
          <span>Total Amount</span>
          <span className="text-[#1E293B]">₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          loading={bookingLoading}
          icon={CheckCircle2}
          onClick={onConfirm}
        >
          Confirm Booking
        </Button>
      </div>
    </Modal>
  );
}
