import { rooms } from "@/data/roomsData";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

/**
 * Fetch all rooms, optionally filtered
 * @param {{ type?: string, maxPrice?: number, minCapacity?: number }} filters
 */
export async function getRooms(filters = {}) {
  await delay();
  let result = [...rooms];

  if (filters.type && filters.type !== "All") {
    result = result.filter((r) => r.type === filters.type);
  }
  if (filters.maxPrice) {
    result = result.filter((r) => r.price <= filters.maxPrice);
  }
  if (filters.minCapacity) {
    result = result.filter((r) => r.capacity >= filters.minCapacity);
  }

  return result;
}

/**
 * Fetch a single room by id
 * @param {number|string} id
 */
export async function getRoomById(id) {
  await delay(300);
  const room = rooms.find((r) => r.id === Number(id));
  if (!room) throw new Error("Room not found");
  return room;
}

/**
 * Check availability for a room given date range
 * Returns { available: boolean, message: string }
 * @param {number} roomId
 * @param {string} startDate  — "YYYY-MM-DD"
 * @param {string} endDate    — "YYYY-MM-DD"
 */
export async function checkAvailability(roomId, startDate, endDate) {
  await delay(600);

  const room = rooms.find((r) => r.id === Number(roomId));
  if (!room) return { available: false, message: "Room not found." };

  // Also check bookings from localStorage
  const storedBookings =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("mockBookings") || "[]")
      : [];

  const roomBookings = storedBookings.filter(
    (b) => b.roomId === Number(roomId) && b.status !== "cancelled"
  );

  const allBlockedRanges = [
    ...room.bookedDates,
    ...roomBookings.map((b) => ({ start: b.startDate, end: b.endDate })),
  ];

  const reqStart = new Date(startDate);
  const reqEnd = new Date(endDate);

  const isConflict = allBlockedRanges.some(({ start, end }) => {
    const bookedStart = new Date(start);
    const bookedEnd = new Date(end);
    // Overlap check: reqStart < bookedEnd && reqEnd > bookedStart
    return reqStart < bookedEnd && reqEnd > bookedStart;
  });

  if (isConflict) {
    return {
      available: false,
      message: "This room is already booked for the selected dates.",
    };
  }

  return { available: true, message: "Room is available for your stay!" };
}

/**
 * Create a new booking (saves to localStorage)
 * @param {{ userId, roomId, roomName, roomType, startDate, endDate, guests, pricePerNight }} data
 */
export async function createBooking(data) {
  await delay(800);

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(data.endDate) - new Date(data.startDate)) /
        (1000 * 60 * 60 * 24)
    )
  );

  const booking = {
    id: `BK-${Date.now()}`,
    ...data,
    nights,
    totalPrice: nights * data.pricePerNight,
    status: "confirmed",
    bookedAt: new Date().toISOString(),
  };

  const existing =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("mockBookings") || "[]")
      : [];

  localStorage.setItem("mockBookings", JSON.stringify([booking, ...existing]));
  return booking;
}

/**
 * Get all bookings for a user
 * @param {number} userId
 */
export function getUserBookings(userId) {
  if (typeof window === "undefined") return [];
  const all = JSON.parse(localStorage.getItem("mockBookings") || "[]");
  return all.filter((b) => b.userId === userId);
}

/**
 * Cancel a booking by id
 * @param {string} bookingId
 */
export function cancelBookingById(bookingId) {
  if (typeof window === "undefined") return;
  const all = JSON.parse(localStorage.getItem("mockBookings") || "[]");
  const updated = all.map((b) =>
    b.id === bookingId ? { ...b, status: "cancelled" } : b
  );
  localStorage.setItem("mockBookings", JSON.stringify(updated));
  return updated.find((b) => b.id === bookingId);
}
