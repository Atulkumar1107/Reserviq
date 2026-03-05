"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("mockCurrentUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, []);


  const register = async ({
    username,
    email,
    password,
    firstName,
    lastName,
  }) => {
    try {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];

      const userExists = users.find((u) => u.email === email);

      if (userExists) {
        alert("User already exists with this email");
        return;
      }

      const newUser = {
        id: Date.now(),
        username,
        email,
        password, 
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      };

      const updatedUsers = [...users, newUser];

      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
      localStorage.setItem("mockCurrentUser", JSON.stringify(newUser));

      setUser(newUser);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!foundUser) {
        alert("Invalid email or password");
        return;
      }
      localStorage.setItem("mockCurrentUser", JSON.stringify(foundUser));
      setUser(foundUser);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("mockCurrentUser");
    setUser(null);
    router.push("/");
  };


  const updateProfile = async (updatedData) => {
    try {
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...updatedData } : u
      );
      const updatedUser = updatedUsers.find((u) => u.id === user.id);
      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
      localStorage.setItem("mockCurrentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };


  const updatePassword = async (currentPassword, newPassword) => {
    try {
      if (user.password !== currentPassword) {
        throw new Error("Current password is incorrect");
      }
      const users = JSON.parse(localStorage.getItem("mockUsers")) || [];
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, password: newPassword } : u
      );
      const updatedUser = updatedUsers.find((u) => u.id === user.id);
      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
      localStorage.setItem("mockCurrentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const addBooking = (booking) => {
    try {
      if (!user) return null;
      const bookings = JSON.parse(localStorage.getItem("mockBookings")) || [];
      const newBooking = { ...booking, userId: user.id };
      localStorage.setItem("mockBookings", JSON.stringify([newBooking, ...bookings]));
      return newBooking;
    } catch (error) {
      console.error("Failed to add booking:", error);
      return null;
    }
  };

  const getBookings = () => {
    try {
      if (!user) return [];
      const bookings = JSON.parse(localStorage.getItem("mockBookings")) || [];
      return bookings.filter((b) => b.userId === user.id);
    } catch (error) {
      console.error("Failed to get bookings:", error);
      return [];
    }
  };


  const cancelBooking = (bookingId) => {
    try {
      const bookings = JSON.parse(localStorage.getItem("mockBookings")) || [];
      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      );
      localStorage.setItem("mockBookings", JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        updateProfile,
        updatePassword,
        addBooking,
        getBookings,
        cancelBooking,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
