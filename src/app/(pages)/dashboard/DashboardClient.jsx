"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BedDouble, CalendarCheck, Sparkles, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import RoomCard from "@/components/booking/RoomCard";
import RoomFilters from "@/components/booking/RoomFilters";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

export default function DashboardClient() {
  const { user, getBookings } = useAuth();
  const { rooms, roomsLoading, roomsError, fetchRooms } = useBooking();
  const router = useRouter();

  useEffect(() => {
    fetchRooms();
  }, []);

  const myBookings = useMemo(() => getBookings(), [user]);
  const activeBookings = myBookings.filter((b) => b.status === "confirmed").length;

  const stats = [
    {
      label: "Available Rooms",
      value: rooms.length,
      icon: BedDouble,
      color: "text-[#1E293B] bg-slate-50",
    },
    {
      label: "My Active Bookings",
      value: activeBookings,
      icon: CalendarCheck,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Room Types",
      value: 4,
      icon: Sparkles,
      color: "text-violet-600 bg-violet-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-sm font-semibold tracking-widest text-[#1E293B] uppercase mb-1">
            Welcome back
          </p>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {user?.firstName || user?.name || "Guest"}&apos;s Dashboard
          </h1>
          <p className="text-gray-500 text-base">
            Discover our curated botanical retreats and make your reservation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Available Rooms
          </h2>
          <RoomFilters />
        </div>

        {roomsLoading ? (
          <div className="flex justify-center py-24">
            <Spinner size="lg" />
          </div>
        ) : roomsError ? (
          <div className="flex justify-center py-16">
            <p className="text-red-500 text-sm">{roomsError}</p>
          </div>
        ) : rooms.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Rooms Found"
            description="No rooms match your current filters. Try adjusting your search."
            actionLabel="Clear Filters"
            onAction={() => fetchRooms({ type: "All", maxPrice: null, minCapacity: null })}
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
