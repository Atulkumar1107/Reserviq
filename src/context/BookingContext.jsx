"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  getRooms,
  getRoomById,
  checkAvailability,
  createBooking,
} from "@/services/roomService";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // ── Room listing state ──────────────────────────────────
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsError, setRoomsError] = useState(null);

  // ── Active filters ───────────────────────────────────────
  const [filters, setFilters] = useState({
    type: "All",
    maxPrice: null,
    minCapacity: null,
  });

  // ── Room detail state ────────────────────────────────────
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomDetailLoading, setRoomDetailLoading] = useState(false);
  const [roomDetailError, setRoomDetailError] = useState(null);

  // ── Booking flow state ───────────────────────────────────
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [guests, setGuests] = useState(1);
  const [availability, setAvailability] = useState(null); // { available, message }
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  // ── Fetch room listing ───────────────────────────────────
  const fetchRooms = useCallback(async (overrideFilters = {}) => {
    setRoomsLoading(true);
    setRoomsError(null);
    try {
      const activeFilters = { ...filters, ...overrideFilters };
      const data = await getRooms(activeFilters);
      setRooms(data);
    } catch (err) {
      setRoomsError(err.message || "Failed to load rooms.");
    } finally {
      setRoomsLoading(false);
    }
  }, [filters]);

  // ── Update filters ────────────────────────────────────────
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setAvailability(null);
  }, []);

  // ── Fetch room detail ─────────────────────────────────────
  const fetchRoomDetail = useCallback(async (id) => {
    setRoomDetailLoading(true);
    setRoomDetailError(null);
    setAvailability(null);
    try {
      const room = await getRoomById(id);
      setSelectedRoom(room);
    } catch (err) {
      setRoomDetailError(err.message || "Room not found.");
    } finally {
      setRoomDetailLoading(false);
    }
  }, []);

  // ── Check availability ────────────────────────────────────
  const checkRoomAvailability = useCallback(async () => {
    if (!selectedRoom || !dateRange.startDate || !dateRange.endDate) return;
    setAvailabilityLoading(true);
    setAvailability(null);
    try {
      const result = await checkAvailability(
        selectedRoom.id,
        dateRange.startDate,
        dateRange.endDate
      );
      setAvailability(result);
    } catch (err) {
      setAvailability({ available: false, message: "Could not check availability." });
    } finally {
      setAvailabilityLoading(false);
    }
  }, [selectedRoom, dateRange]);

  // ── Confirm booking ───────────────────────────────────────
  const confirmBooking = useCallback(
    async (userId) => {
      if (!selectedRoom || !dateRange.startDate || !dateRange.endDate) return null;
      setBookingLoading(true);
      try {
        const booking = await createBooking({
          userId,
          roomId: selectedRoom.id,
          roomName: selectedRoom.name,
          roomType: selectedRoom.type,
          roomImage: selectedRoom.image,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          guests,
          pricePerNight: selectedRoom.price,
        });
        setLastBooking(booking);
        setAvailability(null);
        setDateRange({ startDate: "", endDate: "" });
        return booking;
      } catch (err) {
        console.error("Booking failed:", err);
        return null;
      } finally {
        setBookingLoading(false);
      }
    },
    [selectedRoom, dateRange, guests]
  );

  // ── Reset booking flow ────────────────────────────────────
  const resetBookingFlow = useCallback(() => {
    setDateRange({ startDate: "", endDate: "" });
    setGuests(1);
    setAvailability(null);
    setLastBooking(null);
  }, []);

  const value = useMemo(
    () => ({
      rooms,
      roomsLoading,
      roomsError,
      filters,
      fetchRooms,
      updateFilters,
      selectedRoom,
      roomDetailLoading,
      roomDetailError,
      fetchRoomDetail,
      dateRange,
      setDateRange,
      guests,
      setGuests,
      availability,
      availabilityLoading,
      checkRoomAvailability,
      bookingLoading,
      confirmBooking,
      lastBooking,
      resetBookingFlow,
    }),
    [
      rooms,
      roomsLoading,
      roomsError,
      filters,
      fetchRooms,
      updateFilters,
      selectedRoom,
      roomDetailLoading,
      roomDetailError,
      fetchRoomDetail,
      dateRange,
      guests,
      availability,
      availabilityLoading,
      checkRoomAvailability,
      bookingLoading,
      confirmBooking,
      lastBooking,
      resetBookingFlow,
    ]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
