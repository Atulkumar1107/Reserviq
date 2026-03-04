import DashboardClient from "./DashboardClient";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata = {
  title: "Room Dashboard | Explore Available Rooms - Reserviq",
  description: "Browse and book our curated selection of premium rooms and botanical retreats.",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardClient />
    </ProtectedRoute>
  );
}
