import ProfileClient from "./ProfileClient";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata = {
  title: "My Profile | Account Settings - Reserviq",
  description: "View and update your personal information, security settings, and notifications.",
};

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileClient />
    </ProtectedRoute>
  );
}
