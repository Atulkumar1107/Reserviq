"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import OrderCard from "../components/OrderCard";
import { 
  Package, 
  User, 
  Clock, 
  LayoutDashboard,
  ShoppingBag,
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";

export default function PreviousOrders() {
  const { user, getOrders } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getOrders) {
      // Get all orders and filter for delivered
      const allOrders = getOrders();
      const previous = allOrders.filter(o => o.status?.toLowerCase() === "delivered");
      setOrders(previous);
      setLoading(false);
    }
  }, [getOrders]);

  const navItems = [
    { label: "Account Overview", icon: User, href: "/profile" },
    { label: "Active Orders", icon: Clock, href: "/orders/active" },
    { label: "Order History", icon: Package, href: "/orders/previous", active: true },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6 md:mt-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar / Mobile Nav */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-32">
              <div className="p-6 md:p-8 bg-[#916a6b] text-white">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <ShoppingBag size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h2 className="font-black text-lg md:text-xl tracking-tight uppercase">My Orders</h2>
                        <p className="text-[9px] md:text-[10px] text-white/70 font-black uppercase tracking-widest">Order History</p>
                    </div>
                </div>
              </div>
              
              <nav className="p-2 md:p-4 flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar space-x-2 lg:space-x-0 lg:space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex-shrink-0 lg:w-full flex items-center space-x-3 md:space-x-4 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all font-bold text-sm md:text-base ${
                      item.active 
                        ? "bg-[#FAF9F6] text-[#916a6b] shadow-sm ring-1 ring-[#916a6b]/10" 
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon size={18} className="md:w-5 md:h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                <div className="hidden lg:block pt-6 mt-6 border-t border-gray-50">
                  <Link 
                    href="/shopnow"
                    className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-[#916a6b] hover:bg-rose-50 transition-all font-black uppercase tracking-widest text-xs"
                  >
                    <LayoutDashboard size={18} />
                    <span>Back to Shop</span>
                  </Link>
                </div>
              </nav>
            </div>
            {/* Mobile Back to Shop */}
            <div className="lg:hidden mt-4">
              <Link 
                href="/shopnow"
                className="w-full flex items-center justify-center space-x-3 px-5 py-3 rounded-2xl bg-white border border-gray-100 text-[#916a6b] font-black uppercase tracking-widest text-[10px]"
              >
                <LayoutDashboard size={16} />
                <span>Return to Shopping</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 mt-6 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-12 min-h-[500px] lg:min-h-[600px]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">Order History</h1>
                  <p className="text-gray-500 font-medium mt-1 md:mt-2 text-sm md:text-base">Review your past purchases and reorder items.</p>
                </div>
                <div className="flex items-center">
                    <span className="bg-gray-100 text-gray-700 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] border border-gray-200">
                        {orders.length} DELIVERED
                    </span>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-[#916a6b]"></div>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
                  {orders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 md:py-20 bg-gray-50/50 rounded-2xl md:rounded-3xl border-2 border-dashed border-gray-100 animate-in zoom-in duration-300 px-6">
                  <Package className="mx-auto text-gray-300 mb-4 w-12 h-12 md:w-14 md:h-14" size={56} />
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">No delivered orders yet</h3>
                  <p className="text-gray-500 max-w-xs mx-auto mt-2 mb-8 text-sm md:text-base">Once your active orders are delivered, they will appear here in your history.</p>
                  <Link 
                    href="/shopnow" 
                    className="inline-flex items-center gap-3 bg-[#916a6b] text-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-black uppercase tracking-widest hover:shadow-xl hover:shadow-rose-900/20 transition-all active:scale-[0.98] text-xs md:text-sm"
                  >
                    Start Shopping
                    <ArrowLeft className="rotate-180" size={20} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
