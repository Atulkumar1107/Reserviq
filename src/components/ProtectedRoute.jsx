"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
       router.push(
         `/login?returnTo=${encodeURIComponent(window.location.pathname)}`
       );
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return children;
}
