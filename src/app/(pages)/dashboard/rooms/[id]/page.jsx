"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Users,
  Maximize2,
  Building2,
  CheckCircle2,
  XCircle,
  Loader2,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DateRangePicker from "@/components/booking/DateRangePicker";
import BookingConfirmModal from "@/components/booking/BookingConfirmModal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";

function RoomDetailContent() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const {
    selectedRoom,
    roomDetailLoading,
    roomDetailError,
    fetchRoomDetail,
    dateRange,
    guests,
    setGuests,
    availability,
    availabilityLoading,
    checkRoomAvailability,
    bookingLoading,
    confirmBooking,
    lastBooking,
    resetBookingFlow,
  } = useBooking();

  const [activeImage, setActiveImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRoomDetail(id);
      resetBookingFlow();
    }
  }, [id]);

  useEffect(() => {
    if (selectedRoom) {
      setActiveImage(selectedRoom.image);
    }
  }, [selectedRoom]);

  const handleDatesValid = useCallback(() => {
    checkRoomAvailability();
  }, [checkRoomAvailability]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate && dateRange.endDate > dateRange.startDate) {
      const t = setTimeout(() => checkRoomAvailability(), 300);
      return () => clearTimeout(t);
    }
  }, [dateRange.startDate, dateRange.endDate]);

  const handleConfirm = async () => {
    const booking = await confirmBooking(user?.id);
    if (booking) {
      setShowModal(false);
      setShowSuccess(true);
    }
  };

  if (roomDetailLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (roomDetailError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-4">
        <p className="text-red-500">{roomDetailError}</p>
        <Button variant="secondary" onClick={() => router.push("/dashboard")}>
          ← Back to Dashboard
        </Button>
      </div>
    );
  }

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
  const canBook =
    availability?.available && nights > 0 && !showSuccess;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E293B] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Rooms
        </Link>

        <AnimatePresence>
          {showSuccess && lastBooking && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-emerald-800">
                  Booking Confirmed! 🎉
                </p>
                <p className="text-sm text-emerald-700">
                  Booking ID: <span className="font-mono">{lastBooking.id}</span>
                </p>
              </div>
              <Link href="/my-bookings">
                <Button variant="success" size="sm" icon={CalendarCheck}>
                  View My Bookings
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={selectedRoom.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute top-4 left-4">
                <Badge variant={selectedRoom.type}>{selectedRoom.type}</Badge>
              </div>
            </div>

            {selectedRoom.gallery?.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {[selectedRoom.image, ...selectedRoom.gallery.filter(img => img !== selectedRoom.image)].map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(src)}
                    className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === src 
                        ? "border-[#1E293B] shadow-md scale-95" 
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${selectedRoom.name} gallery ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-black text-gray-900">
                  {selectedRoom.name}
                </h1>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="h-5 w-5 fill-amber-400" />
                  <span className="font-bold text-gray-900">
                    {selectedRoom.rating}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({selectedRoom.reviews})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> Up to {selectedRoom.capacity}{" "}
                  guests
                </span>
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="h-4 w-4" /> {selectedRoom.size}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" /> Floor {selectedRoom.floor}
                </span>
              </div>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {selectedRoom.description}
              </p>
            </div>

            <div>
              <h2 className="font-bold text-gray-900 mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 text-[#1E293B] text-sm font-medium"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sticky top-32 space-y-5">
              <div>
                <span className="text-3xl font-black text-[#1E293B]">
                  ₹{selectedRoom.price.toLocaleString()}
                </span>
                <span className="text-gray-400 text-sm"> / night</span>
              </div>

              <DateRangePicker onDatesValid={handleDatesValid} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <select
                  id="guests-select"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
                >
                  {Array.from(
                    { length: selectedRoom.capacity },
                    (_, i) => i + 1
                  ).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>

              {availabilityLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin text-[#1E293B]" />
                  Checking availability…
                </div>
              )}
              {availability && !availabilityLoading && (
                <div
                  className={`flex items-start gap-2 p-3 rounded-xl text-sm ${
                    availability.available
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {availability.available ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  )}
                  {availability.message}
                </div>
              )}

              {nights > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>
                      ₹{selectedRoom.price.toLocaleString()} × {nights} nights
                    </span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-[#1E293B]">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <Button
                variant="primary"
                className="w-full"
                disabled={!canBook && !showSuccess}
                onClick={() => {
                  if (!user) {
                    router.push(`/login?returnTo=/dashboard/rooms/${id}`);
                    return;
                  }
                  setShowModal(true);
                }}
              >
                {showSuccess ? "Booking Confirmed ✓" : "Book Now"}
              </Button>

              {!dateRange.startDate && (
                <p className="text-xs text-center text-gray-400">
                  Select dates to check availability
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookingConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default function RoomDetailPage() {
  return (
    <RoomDetailContent />
  );
}
