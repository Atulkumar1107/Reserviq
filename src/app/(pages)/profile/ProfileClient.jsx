"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  User, 
  Lock, 
  Mail, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Calendar,
  ShoppingBag,
  Bell
} from "lucide-react";

export default function ProfileClient() {
  const { user, updatePassword, updateProfile, logout, getOrders } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || ""
  });
  
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  
  const [message, setMessage] = useState({ type: "", content: "" });
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (user && getOrders) {
      setEditData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
      const userOrders = getOrders();
      setOrderCount(userOrders ? userOrders.length : 0);
    }
  }, [user, getOrders]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        ...editData,
        name: `${editData.firstName} ${editData.lastName}`
      });
      setMessage({ type: "success", content: "Profile updated successfully!" });
      setIsEditingProfile(false);
    } catch (error) {
      setMessage({ type: "error", content: "Failed to update profile." });
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      setMessage({ type: "error", content: "New passwords do not match!" });
      return;
    }

    try {
      await updatePassword(passwordData.current, passwordData.new);
      setMessage({ type: "success", content: "Password updated successfully!" });
      setPasswordData({ current: "", new: "", confirm: "" });
    } catch (error) {
      setMessage({ type: "error", content: error.message || "Failed to update password." });
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-6 md:mt-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 bg-[#1E293B] text-white text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-2xl md:rounded-3xl mx-auto flex items-center justify-center mb-4 md:mb-6 backdrop-blur-md rotate-3 group-hover:rotate-0 transition-transform">
                  <span className="text-xl md:text-3xl font-black">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight">{user?.name}</h2>
                <p className="text-xs md:text-sm text-white/70 font-medium truncate px-4">{user?.email}</p>
              </div>
              
              <nav className="p-2 md:p-4 flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar space-x-2 lg:space-x-0 lg:space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                        setActiveTab(tab.id);
                        setMessage({ type: "", content: "" });
                    }}
                    className={`shrink-0 lg:w-full flex items-center space-x-3 md:space-x-4 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all font-bold text-sm md:text-base ${
                      activeTab === tab.id 
                        ? "bg-[#FAF9F6] text-[#1E293B] shadow-sm ring-1 ring-[#1E293B]/10" 
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon size={18} className="md:w-5 md:h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
                
                <div className="hidden lg:block pt-6 mt-6 border-t border-gray-50">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all font-black uppercase tracking-widest text-xs"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
            {/* Mobile Logout (Separate from tabs) */}
            <div className="lg:hidden mt-6">
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center space-x-3 px-5 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-slate-500 font-black uppercase tracking-widest text-[10px]"
              >
                <LogOut size={16} />
                <span>Logout Current Session</span>
              </button>
            </div>
          </div>

          <div className="flex-1 mt-6 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 lg:p-12 min-h-[500px] lg:min-h-[600px]">
              
              {message.content && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
                  message.type === "error" ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"
                }`}>
                  <ShieldCheck size={20} />
                  <span className="text-sm font-medium">{message.content}</span>
                </div>
              )}

              {activeTab === "overview" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">Account Overview</h2>
                    <button 
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="w-full sm:w-auto px-6 py-2.5 border-2 border-[#1E293B] text-[#1E293B] rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-[#1E293B] hover:text-white transition-all active:scale-[0.98]"
                    >
                        {isEditingProfile ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase">First Name</label>
                            <input 
                                type="text"
                                value={editData.firstName}
                                onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                                className="w-full px-5 py-4 bg-gray-50/50 border border-transparent focus:border-[#1E293B] rounded-2xl focus:ring-4 focus:ring-[#1E293B]/10 outline-none transition-all text-gray-900 font-bold placeholder-gray-400"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase">Last Name</label>
                            <input 
                                type="text"
                                value={editData.lastName}
                                onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#9DC08B] outline-none border-none text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                            <input 
                                type="email"
                                value={editData.email}
                                onChange={(e) => setEditData({...editData, email: e.target.value})}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#9DC08B] outline-none border-none text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        <div className="md:col-span-2 pt-8">
                            <button type="submit" className="bg-[#1E293B] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:shadow-xl hover:shadow-slate-900/20 transition-all active:scale-[0.98]">
                                Save Changes
                            </button>
                        </div>
                    </form>
                  ) : (
                    <>
                    

                      <div className="space-y-4 md:space-y-6 pt-4">
                        <div className="flex items-center justify-between p-4 md:p-6 bg-gray-50/50 rounded-2xl border border-gray-50 transition-colors">
                          <div className="flex items-center gap-4 md:gap-6">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                              <User className="text-[#1E293B] w-5 h-5 md:w-6 md:h-6" size={24} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 md:mb-1">Full Name</p>
                                <p className="font-black text-lg md:text-xl text-gray-900 tracking-tight truncate">{user?.name}</p>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-300 shrink-0" />
                        </div>

                        <div className="flex items-center justify-between p-4 md:p-6 bg-gray-50/50 rounded-2xl border border-gray-50 transition-colors">
                          <div className="flex items-center gap-4 md:gap-6 min-w-0">
                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                              <Mail className="text-[#1E293B] w-5 h-5 md:w-6 md:h-6" size={24} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 md:mb-1">Email Address</p>
                                <p className="font-black text-base md:text-xl text-gray-900 tracking-tight truncate">{user?.email}</p>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-300 shrink-0" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Security Settings</h2>
                    <p className="text-gray-500 font-medium mt-2">Manage your password and account security</p>
                  </div>

                  <form onSubmit={handlePasswordUpdate} className="w-full max-w-md space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Current Password</label>
                        <input 
                            type="password"
                            placeholder="••••••••"
                            value={passwordData.current}
                            onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                            required
                            className="w-full px-5 py-4 bg-gray-50/50 border border-transparent focus:border-[#916a6b] rounded-2xl focus:ring-4 focus:ring-[#916a6b]/10 outline-none transition-all text-gray-900 font-bold placeholder-gray-400"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">New Password</label>
                        <input 
                            type="password"
                            placeholder="Enter new password"
                            value={passwordData.new}
                            onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                            required
                            className="w-full px-5 py-4 bg-gray-50/50 border border-transparent focus:border-[#916a6b] rounded-2xl focus:ring-4 focus:ring-[#916a6b]/10 outline-none transition-all text-gray-900 font-bold placeholder-gray-400"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Confirm New Password</label>
                        <input 
                            type="password"
                            placeholder="Repeat new password"
                            value={passwordData.confirm}
                            onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                            required
                            className="w-full px-5 py-4 bg-gray-50/50 border border-transparent focus:border-[#916a6b] rounded-2xl focus:ring-4 focus:ring-[#916a6b]/10 outline-none transition-all text-gray-900 font-bold placeholder-gray-400"
                        />
                    </div>
                     <div className="pt-8">
                        <button type="submit" className="bg-[#1E293B] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:shadow-xl hover:shadow-slate-900/20 transition-all active:scale-[0.98] w-full sm:w-auto">
                            Update Password
                        </button>
                    </div>
                  </form>
                </div>
              )}



              {activeTab === "notifications" && (
                 <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-[#FAF9F6] rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                        <Bell className="text-[#1E293B]" size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">All caught up!</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mt-4 font-medium leading-relaxed">You don't have any new notifications at the moment. We'll let you know when things happen.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
