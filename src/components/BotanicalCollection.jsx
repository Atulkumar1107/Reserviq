"use client";

import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Maximize2, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";

const RoomGrid = memo(function RoomGrid({ rooms }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {rooms.map((room, i) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
        >
       
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-5">
            <img
              src={room.image}
              alt={room.name}
              className="h-36 md:h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur rounded-lg px-2.5 py-1 shadow">
              <span className="text-[#1E293B] font-bold text-sm">
                ₹{room.price.toLocaleString()}
              </span>
              <span className="text-gray-400 text-xs">/night</span>
            </div>
            <div className="absolute top-2 left-2">
              <Badge variant={room.type}>{room.type}</Badge>
            </div>
          </div>

          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm md:text-lg font-bold text-gray-900 leading-snug line-clamp-2">
              {room.name}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0 text-amber-400">
              <Star className="h-3.5 w-3.5 fill-amber-400" />
              <span className="text-xs font-semibold text-gray-700">{room.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {room.capacity}
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="h-3 w-3" /> {room.size}
            </span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
            {room.description}
          </p>

          <Link
            href={`/dashboard/rooms/${room.id}`}
            className="mt-auto bg-[#FAF9F6] text-[#1E293B] border-2 border-[#1E293B] px-4 py-2 md:px-6 md:py-3 rounded-2xl hover:bg-[#1E293B] hover:text-white transition-all font-black uppercase tracking-widest text-[10px] md:text-xs text-center"
          >
            View &amp; Book
          </Link>
        </motion.div>
      ))}
    </div>
  );
});

const BotanicalCollection = () => {
  const { rooms, roomsLoading, fetchRooms } = useBooking();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const featuredRoom = rooms.length > 0
    ? [...rooms].sort((a, b) => b.rating - a.rating)[0]
    : null;

  useEffect(() => {
    if (featuredRoom) {
      setActiveImage(featuredRoom.image);
    }
  }, [featuredRoom]);

  const recommendedRooms = rooms.filter(
    (r) => r.id !== featuredRoom?.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">

        {roomsLoading ? (
          <div className="flex justify-center py-32">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            {featuredRoom && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-24"
              >
                <div className="grid md:grid-cols-2 gap-12 p-8 lg:p-16">
                  <div className="flex flex-col">
                    <div className="relative rounded-2xl overflow-hidden mb-4 h-[380px] bg-gray-100">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImage}
                          src={activeImage}
                          alt={featuredRoom.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>
                      <div className="absolute top-4 left-4">
                        <Badge variant={featuredRoom.type}>{featuredRoom.type}</Badge>
                      </div>
                    </div>
                    {featuredRoom.gallery?.length > 0 && (
                      <div className="grid grid-cols-4 gap-3">
                        {[featuredRoom.image, ...featuredRoom.gallery.filter(img => img !== featuredRoom.image)].map((src, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImage(src)}
                            className={`h-20 rounded-xl overflow-hidden border-2 transition-all ${
                              activeImage === src 
                                ? "border-[#1E293B] shadow-md scale-95" 
                                : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img src={src} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-700">{featuredRoom.rating}</span>
                      <span className="text-gray-400 text-sm">({featuredRoom.reviews} reviews)</span>
                    </div>

                    <h2 className="text-4xl text-gray-900 font-black mb-4 tracking-tight">
                      {featuredRoom.name}
                    </h2>

                    <p className="text-3xl text-[#1E293B] font-black mb-6">
                      ₹{featuredRoom.price.toLocaleString()}
                      <span className="text-base text-gray-400 font-normal"> / night</span>
                    </p>

                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {featuredRoom.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                        Room Amenities
                      </h3>
                      <ul className="space-y-2">
                        {featuredRoom.amenities.slice(0, 5).map((a) => (
                          <li key={a} className="flex items-center text-gray-700 font-medium">
                            <span className="w-1.5 h-1.5 bg-[#1E293B] rounded-full mr-3" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/dashboard/rooms/${featuredRoom.id}`}
                      className="bg-[#1E293B] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#334155] transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] w-full md:w-auto text-center"
                    >
                      View &amp; Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">
                  Explore Our Rooms
                </h2>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-[#1E293B] font-bold text-sm hover:gap-3 transition-all"
                >
                  Browse All Rooms <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <RoomGrid rooms={recommendedRooms} />
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default BotanicalCollection;
