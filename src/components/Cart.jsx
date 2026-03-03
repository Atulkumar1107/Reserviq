"use client";
import React, { useEffect } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const MAX_QUANTITY = 99;

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FAF9F6] shadow-2xl">
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h2 className="text-2xl text-[#40513B] font-black tracking-tight uppercase">
              Your Cart
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="p-2 text-gray-400 hover:text-[#916a6b] hover:bg-gray-50 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg mb-4"
                >
                  <img
                    src={item.productImgs?.[0]?.url || item.images?.[0] || item.image || ""}
                    alt={item.title || item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 leading-tight">
                      {item.title || item.name}
                    </h3>

                    <p className="text-sm text-gray-400 font-medium mt-1">
                      ${item.price} per unit
                    </p>

                    <div className="flex items-center mt-4 p-1 bg-gray-50 rounded-xl w-fit border border-gray-100">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.id, item.quantity - 1)
                            : removeFromCart(item.id)
                        }
                        className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 hover:text-[#916a6b] transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="px-4 font-black text-gray-900 min-w-[40px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          item.quantity < MAX_QUANTITY &&
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 hover:text-[#916a6b] transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-px h-4 bg-gray-200 mx-2" />

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="font-black text-[#916a6b] text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-8 bg-white space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-[#916a6b]">Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#40513B] font-black text-xl uppercase tracking-tighter">Total</span>
                  <span className="font-black text-3xl text-[#916a6b]">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/checkout");
                }}
                className="w-full bg-[#916a6b] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-[#7a595a] transition-all shadow-xl hover:shadow-rose-900/10 active:scale-[0.98]"
              >
                Go to Checkout
              </button>
              
              <p className="text-center text-xs text-gray-400 font-medium pb-2">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Cart;
