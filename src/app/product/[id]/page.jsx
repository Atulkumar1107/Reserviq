"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/productsData";
import Header from "@/components/Header";

export default function ProductPage() {
  const params = useParams(); // ✅ Correct for Next 15
  const router = useRouter();
  const { cartItems, addToCart, updateQuantity, setIsCartOpen } = useCart();

  const product =
    products.find((p) => p.slug === params.id || p.id === Number(params.id)) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const MAX_QUANTITY = 99;

  // Sync quantity with cart
  useEffect(() => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setQuantity(existing.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItems, product.id]);

  const handleQuantityChange = (value) => {
    const valid = Math.max(1, Math.min(value, MAX_QUANTITY));
    setQuantity(valid);
  };

  const handleAddToCart = () => {
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      updateQuantity(product.id, quantity);
    } else {
      addToCart(product, quantity);
    }

    setIsCartOpen(true); // ✅ Opens global cart drawer
  };

  return (
    <>
      <Header forceDark={true} />

      <div className="min-h-screen mt-[72px] bg-[#FAF9F6]">
        <div className="max-w-[1370px] mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-12 p-8 lg:p-16 bg-white rounded-3xl shadow-sm border border-gray-100">

            {/* LEFT: IMAGE SECTION */}
            <div>
              <img
                src={product.productImgs?.[selectedImage]?.url}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />

              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.productImgs?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded overflow-hidden ${
                      selectedImage === index
                        ? "ring-2 ring-[#916a6b]"
                        : "border border-gray-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">
                {product.title}
              </h1>

              <p className="text-3xl text-[#916a6b] font-black mb-8">
                ${product.price}
              </p>

              <p className="text-gray-600 mb-6">
                {product.description}
              </p>

              <ul className="space-y-2 text-gray-600 mb-6">
                {product.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-600">Quantity:</span>

                <div className="flex items-center border rounded">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 text-gray-600 py-1"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>

                  <input
                    type="number"
                    min="1"
                    max={MAX_QUANTITY}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="w-16 text-center text-gray-600 border-x"
                  />

                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 text-gray-600 py-1"
                    disabled={quantity >= MAX_QUANTITY}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 bg-[#916a6b] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7a595a] transition-all shadow-xl shadow-rose-900/10 active:scale-[0.98]"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
