"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  LogOut,
  BedDouble,
  CalendarCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { rooms } from "@/data/roomsData";

const Header = ({ forceDark = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isHome = pathname === "/";
  const shouldBeFixed = forceDark || !isHome;

  const [isFixed, setIsFixed] = useState(shouldBeFixed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRoomsDropdownOpen, setIsRoomsDropdownOpen] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isMinimal = !isFixed && !forceDark && isHome;
  const navLinkClass = "text-white";

  // Sticky Header
  useEffect(() => {
    if (shouldBeFixed) {
      setIsFixed(true);
      return;
    }
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsFixed(window.scrollY > heroHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldBeFixed, forceDark]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // Featured rooms for dropdown (first 5)
  const featuredRooms = rooms.slice(0, 5);

  return (
    <>
      <nav
        className={`${
          isFixed || forceDark
            ? "fixed top-0 left-0 right-0 bg-[#1E293B] h-[100px] shadow-lg"
            : "absolute top-0 left-0 right-0 bg-transparent h-[120px]"
        } z-50 px-8 transition-all duration-300 flex items-center`}
      >
        <div className="max-w-7xl mx-auto w-full">
          {isMinimal ? (
            /* Minimal Mode */
<div className="grid grid-cols-[0.5fr_3fr_0.5fr] items-center w-full">
              {/* Left: Hamburger */}
              <div className="flex justify-start">
                <button
                  className={`${navLinkClass} hover:opacity-80 transition-opacity`}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-8 w-8" />
                </button>
              </div>

              {/* Center: Logo */}
              <div className="flex justify-center">
                <Link href="/" className={navLinkClass}>
                  <img
                    src="https://res.cloudinary.com/dwau5poqz/image/upload/v1772550564/ChatGPT_Image_Mar_3_2026_08_39_07_PM_avt0ef.png"
                    alt="Glow Luxe Logo"
className="w-full h-auto max-h-[260px] object-contain transition-all duration-500 mt-4 md:mt-0 md:ml-0 ml-4"
                  />
                </Link>
              </div>

              {/* Right: Auth */}
              <div className="flex justify-end items-center space-x-4">
                {!user ? (
                  <Link href="/login" className={`${navLinkClass} text-sm font-medium`}>
                    Login
                  </Link>
                ) : (
                  <Link href="/dashboard" className={`${navLinkClass} text-sm font-medium flex items-center gap-1`}>
                    <BedDouble className="h-5 w-5" /> Rooms
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Sticky Mode */
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link href="/" className={`${navLinkClass} flex-shrink-0`}>
                <img
                  src="https://res.cloudinary.com/dwau5poqz/image/upload/v1772550564/ChatGPT_Image_Mar_3_2026_08_39_07_PM_avt0ef.png"
                  alt="Glow Luxe Logo"
                  className="h-52 -ml-10 mt-3 w-auto object-contain transition-all duration-300"
                />
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex space-x-8 mt-2 items-center">
                <Link href="/" className={navLinkClass}>Home</Link>

                {/* Rooms Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setIsRoomsDropdownOpen(true)}
                  onMouseLeave={() => setIsRoomsDropdownOpen(false)}
                >
                  <Link
                    href="/dashboard"
                    className={`${navLinkClass} flex items-center space-x-1`}
                  >
                    <span>Rooms</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isRoomsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {isRoomsDropdownOpen && (
                    <div className="absolute left-0 mt-0 w-64 bg-white rounded-b-lg shadow-xl py-2 z-[60] border-t-2 border-[#1E293B] overflow-hidden">
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                        Available Rooms
                      </div>
                      {featuredRooms.map((room) => (
                        <Link
                          key={room.id}
                          href={`/dashboard/rooms/${room.id}`}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-[#FAF9F6] transition-colors group/item"
                          onClick={() => setIsRoomsDropdownOpen(false)}
                        >
                          <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800 line-clamp-1">
                              {room.name}
                            </span>
                            <span className="text-xs text-[#1E293B] font-bold">
                              ₹{room.price.toLocaleString()}/night
                            </span>
                          </div>
                        </Link>
                      ))}
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#1E293B] hover:bg-slate-50 border-t border-gray-100 mt-1"
                        onClick={() => setIsRoomsDropdownOpen(false)}
                      >
                        <BedDouble className="h-4 w-4" /> Browse All Rooms
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="/my-bookings" className={navLinkClass}>
                  My Bookings
                </Link>
                <Link href="/aboutus" className={navLinkClass}>About</Link>
                <Link href="/contact" className={navLinkClass}>Contact</Link>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-6">
                  {user ? (
                    <div
                      className="relative"
                      ref={userMenuRef}
                      onMouseEnter={() => setIsUserMenuOpen(true)}
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <button
                        className={`${navLinkClass} flex items-center space-x-2 py-2`}
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      >
                        <User className="h-6 w-6" />
                        <span className="hidden lg:inline">
                          {user.firstName} {user.lastName}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isUserMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-0 w-52 bg-white rounded-b-lg shadow-xl py-2 z-[60] border-t-2 border-[#1E293B] overflow-hidden">
                          <Link
                            href="/profile"
                            className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#FAF9F6] font-medium transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#FAF9F6] font-medium transition-colors border-t border-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="flex items-center">
                              <BedDouble className="h-4 w-4 mr-2 text-[#1E293B]" />
                              Browse Rooms
                            </div>
                          </Link>
                          <Link
                            href="/my-bookings"
                            className="block px-4 py-3 text-sm text-gray-800 hover:bg-[#FAF9F6] font-medium transition-colors border-t border-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <div className="flex items-center">
                              <CalendarCheck className="h-4 w-4 mr-2 text-[#1E293B]" />
                              My Bookings
                            </div>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors border-t border-gray-100 mt-1"
                          >
                            <div className="flex items-center">
                              <LogOut className="h-4 w-4 mr-2" />
                              Logout
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-6">
                      <Link href="/login" className={navLinkClass}>Login</Link>
                      <Link href="/register" className={navLinkClass}>Register</Link>
                    </div>
                  )}
                </div>

                {/* Hamburger (Mobile) */}
                <button
                  className="md:hidden flex h-7 w-7 text-white hover:opacity-80 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-7 w-7" />
                  ) : (
                    <Menu className="h-7 w-7" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Fullscreen Drawer */}
        <div
          ref={mobileMenuRef}
          className={`fixed inset-0 z-[100] transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out`}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-[#FAF9F6]">
              <span className="text-2xl font-black text-[#1E293B] tracking-tighter">
                GLOW LUXE
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Room Types */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Our Rooms
                </p>
                <div className="grid gap-4">
                  {[
                    { name: "Browse All Rooms", path: "/dashboard", sub: "All room types" },
                    { name: "My Bookings", path: "/my-bookings", sub: "Your reservations" },
                    { name: "Suites", path: "/dashboard", sub: "Premium stays" },
                    { name: "Deluxe Rooms", path: "/dashboard", sub: "Superior comfort" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group block"
                    >
                      <div className="flex items-center justify-between text-xl font-black text-gray-900 group-hover:text-[#916a6b] transition-colors">
                        {item.name}
                        <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </div>
                      <p className="text-xs font-bold text-[#1E293B] uppercase tracking-widest mt-1">
                        {item.sub}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Explore */}
              <div className="pt-8 border-t border-gray-100 space-y-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Explore
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/aboutus"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col gap-2 p-4 bg-[#FAF9F6] rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900">Our Story</span>
                    <span className="text-[10px] text-gray-500 uppercase">Philosophy</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col gap-2 p-4 bg-[#FAF9F6] rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900">Contact</span>
                    <span className="text-[10px] text-gray-500 uppercase">Support</span>
                  </Link>
                </div>
              </div>

              {/* Auth */}
              <div className="pt-8 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  Account
                </p>
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-[#FAF9F6] rounded-2xl mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#D3969B] flex items-center justify-center text-white font-bold">
                        {user.firstName?.[0] || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 text-gray-700 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <User className="h-5 w-5" /> Profile Settings
                    </Link>
                    <Link
                      href="/my-bookings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 text-gray-700 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <CalendarCheck className="h-5 w-5" /> My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors mt-4"
                    >
                      <LogOut className="h-5 w-5" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center p-4 bg-gray-50 text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center p-4 bg-[#1E293B] text-white font-bold rounded-2xl hover:bg-[#334155] transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
