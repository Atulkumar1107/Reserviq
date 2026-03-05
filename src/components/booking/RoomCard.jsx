"use client";
import React, { memo } from "react";
import Link from "next/link";
import { Star, Users, Maximize2, Wifi } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const RoomCard = memo(function RoomCard({ room }) {
  const amenityIcons = { "Free WiFi": <Wifi className="h-3 w-3" /> };

  return (
    <Card hover className="overflow-hidden flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-xl px-3 py-1.5 shadow-md">
          <span className="text-[#1E293B] font-bold text-base">
            ₹{room.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-xs">/night</span>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant={room.type}>{room.type}</Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
            {room.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <span className="text-xs font-semibold text-gray-700">
              {room.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-500 text-xs">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {room.capacity} guests
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 className="h-3.5 w-3.5" /> {room.size}
          </span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2">{room.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {room.amenities.slice(0, 4).map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-50 text-[#1E293B] text-xs font-medium"
            >
              {amenityIcons[a] || null}
              {a}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-500 text-xs">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <Link href={`/dashboard/rooms/${room.id}`} className="mt-2 block">
          <Button variant="primary" className="w-full">
            View &amp; Book
          </Button>
        </Link>
      </div>
    </Card>
  );
});

export default RoomCard;
