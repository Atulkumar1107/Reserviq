import { ProtectedRoute } from "@/components/ProtectedRoute";
import MyBookingsClient from "./MyBookingsClient";

export const metadata = {
  title: "My Bookings | Manage Your Reservations - Reserviq",
  description: "View and manage your current and past room reservations with Reserviq.",
};

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <MyBookingsClient />
    </ProtectedRoute>
  );
}
