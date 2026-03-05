"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CalendarDays,
  BedDouble,
  ArrowRight,
  XCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

export default function MyBookingsClient() {
  const { user, getBookings, cancelBooking } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);

  useEffect(() => {
    setBookings(getBookings());
  }, [user]);

  const handleCancelClick = useCallback((bookingId) => {
    setConfirmCancel(bookingId);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    if (!confirmCancel) return;
    setCancellingId(confirmCancel);
    setTimeout(() => {
      cancelBooking(confirmCancel);
      setBookings(getBookings());
      setCancellingId(null);
      setConfirmCancel(null);
    }, 600);
  }, [confirmCancel, cancelBooking, getBookings]);

  const fmt = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  const statusConfig = {
    confirmed: {
      icon: CheckCircle2,
      label: "Confirmed",
      className: "text-emerald-600",
    },
    cancelled: {
      icon: XCircle,
      label: "Cancelled",
      className: "text-gray-400",
    },
    pending: {
      icon: Clock,
      label: "Pending",
      className: "text-amber-600",
    },
  };

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt)),
    [bookings]
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm font-semibold tracking-widest text-[#1E293B] uppercase mb-1">
            Your reservations
          </p>
          <h1 className="text-4xl font-black text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-500">
            Manage all your room reservations in one place.
          </p>
        </motion.div>

        {sortedBookings.length === 0 ? (
          <EmptyState
            icon={BedDouble}
            title="No Bookings Yet"
            description="You haven't made any room reservations. Explore our botanical rooms and book your perfect retreat."
            actionLabel="Browse Rooms"
            onAction={() =>
              (window.location.href = "/dashboard")
            }
          />
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {sortedBookings.map((booking, i) => {
                const status = statusConfig[booking.status] ?? statusConfig.pending;
                const StatusIcon = status.icon;
                const isCancelled = booking.status === "cancelled";

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                      isCancelled
                        ? "border-gray-100 opacity-60"
                        : "border-gray-100"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-40 h-40 sm:h-auto shrink-0 overflow-hidden">
                        <img
                          src={booking.roomImage}
                          alt={booking.roomName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 p-5 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg leading-snug">
                              {booking.roomName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={booking.roomType}>
                                {booking.roomType}
                              </Badge>
                              <div
                                className={`flex items-center gap-1 text-xs font-medium ${status.className}`}
                              >
                                <StatusIcon className="h-3.5 w-3.5" />
                                {status.label}
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xl font-black text-[#1E293B]">
                              ₹{booking.totalPrice?.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">
                              {booking.nights} {booking.nights === 1 ? "night" : "nights"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays className="h-4 w-4 text-[#1E293B]" />
                          {fmt(booking.startDate)} → {fmt(booking.endDate)}
                        </div>

                        <p className="text-xs text-gray-400 font-mono">
                          #{booking.id}
                        </p>

                        {!isCancelled && (
                          <div className="flex items-center gap-3 mt-auto pt-2">
                            {confirmCancel === booking.id ? (
                              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl w-full">
                                <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                                <span className="text-sm text-red-700 flex-1">
                                  Cancel this booking?
                                </span>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  loading={cancellingId === booking.id}
                                  onClick={handleConfirmCancel}
                                >
                                  Yes, Cancel
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setConfirmCancel(null)}
                                >
                                  Keep
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:bg-red-50"
                                  onClick={() => handleCancelClick(booking.id)}
                                >
                                  Cancel Booking
                                </Button>
                                <Link
                                  href={`/dashboard/rooms/${booking.roomId}`}
                                  className="ml-auto"
                                >
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    icon={ArrowRight}
                                  >
                                    View Room
                                  </Button>
                                </Link>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button variant="secondary" icon={BedDouble}>
              Browse More Rooms
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
