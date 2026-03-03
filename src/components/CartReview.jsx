// src/components/CartReview.js
"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartReview() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item.id);
      return;
    }
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                
                {/* Product Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item.productImgs?.[0]?.url || item.images?.[0] || item.mainImage || item.image || "/images/placeholder.png"}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-black">{item.title || item.name}</h3>

                  <div className="flex items-center mt-2 p-1 bg-gray-50 rounded-lg w-fit border border-gray-100">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="p-1.5 rounded-md hover:bg-white text-[#40513B] transition-colors shadow-sm"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="px-4 font-bold text-[#40513B] min-w-[40px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrease(item)}
                      className="p-1.5 rounded-md hover:bg-white text-[#40513B] transition-colors shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="text-right">
                  <p className="font-medium text-black">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
