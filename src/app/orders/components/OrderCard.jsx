"use client";
import React from "react";
import { Package, Truck, CheckCircle, Clock, ChevronRight, ShoppingBag } from "lucide-react";

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "processing":
      return <Clock className="h-4 w-4" />;
    case "shipped":
      return <Truck className="h-4 w-4" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case "processing":
      return "bg-yellow-50 text-yellow-700 border-yellow-100";
    case "shipped":
      return "bg-blue-50 text-blue-700 border-blue-100";
    case "delivered":
      return "bg-green-50 text-green-700 border-green-100";
    default:
      return "bg-gray-50 text-gray-700 border-gray-100";
  }
};

const OrderCard = ({ order }) => {
  const isDelivered = order.status?.toLowerCase() === "delivered";
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Order Header */}
      <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6 bg-[#FAF9F6]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Order Number</span>
            <span className="bg-[#916a6b] text-white px-2 py-0.5 rounded text-[9px] md:text-[10px] font-black uppercase tracking-widest">NEW</span>
          </div>
          <h3 className="text-lg md:text-xl text-gray-900 font-black tracking-tight flex items-center gap-2">
            #{order.orderNumber || order.id?.toString().slice(-8).toUpperCase()}
          </h3>
          <p suppressHydrationWarning className="text-gray-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Placed on {new Date(order.orderDate || order.id).toLocaleDateString()}</p>
        </div>
        
        <div className={`px-3 md:px-4 py-1.5 rounded-full border ${getStatusStyles(order.status)} flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider`}>
          {getStatusIcon(order.status)}
          {order.status}
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4 md:p-5">
        <div className="space-y-4 md:space-y-6">
          {(order.items || []).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between group gap-4"
            >
              <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FAF9F6] rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center p-1.5 md:p-2">
                  <img
                    src={item.image || (item.productImgs?.[0]?.url)}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-black text-gray-900 group-hover:text-[#916a6b] transition-colors text-base md:text-lg tracking-tight truncate">{item.name || item.title}</p>
                  <p className="text-xs md:text-sm text-gray-500 font-bold">
                    Qty: <span className="text-[#916a6b]">{item.quantity}</span>
                  </p>
                </div>
              </div>
              <p className="font-black text-gray-900 text-base md:text-lg flex-shrink-0">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 md:gap-6">
          <div className="space-y-1">
            <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pricing Summary</p>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="text-xs md:text-sm font-bold text-gray-500">Total:</span>
              <span className="text-2xl md:text-3xl font-black text-[#916a6b]">${(order.totalAmount || order.total)?.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
            {isDelivered && (
              <button className="w-full sm:w-auto bg-[#916a6b] text-white px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest hover:bg-[#7a595a] transition-all flex items-center justify-center gap-3 shadow-xl shadow-rose-900/10 active:scale-[0.98] text-[10px] md:text-xs">
                <ShoppingBag size={16} className="md:w-[18px] md:h-[18px]" />
                Buy Again
              </button>
            )}
            <button className="w-full sm:w-auto border-2 border-gray-100 text-gray-700 px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-2 md:gap-3 active:scale-[0.98] text-[10px] md:text-xs">
              Details
              <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
