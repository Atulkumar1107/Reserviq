import OrderSuccessClient from "./OrderSuccessClient";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata = {
  title: "Booking Successful | Reserviq",
  description: "Your room reservation has been successfully placed.",
};

export default function RedirectToRooms() {
  return <OrderSuccessClient />;
}
