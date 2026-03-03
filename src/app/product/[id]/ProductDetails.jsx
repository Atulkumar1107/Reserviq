// src/app/product/[id]/ProductDetails.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCartIcon, Plus, Minus, X, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetails({ allProducts }) {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth(); // Add this line
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const {
        cartItems,
        addToCart,
        handleQuantity,
        setIsCartOpen,
        isCartOpen,
        removeItem,
    } = useCart();

    const [quantity, setQuantity] = useState(1);
    const MAX_QUANTITY = 99;

    const handleProductClick = (productId) => {
        router.push(`/product/${productId}`);
    };



    // console.log(allProducts)
    useEffect(() => {
        // Find the product by ID (convert params.id to a number)
        const productData = allProducts.find((product) => product.slug === params.id);
        if (productData) {
            setProduct(productData);
            // Set initial quantity from cart if product exists
            const cartItem = cartItems.find(
                (item) => item.slug === params.id
            );

            if (cartItem) {
                setQuantity(cartItem.quantity);
            }
        }
    }, [params.id, cartItems]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (newQuantity) => {
        const validQuantity = Math.max(1, Math.min(newQuantity, MAX_QUANTITY));
        setQuantity(validQuantity);
    };

    const handleAddToCart = async () => {

        const existingItem = cartItems.find((item) => item.id === product.id);
        console.log(existingItem)

        if (existingItem) {
            handleQuantity(existingItem.documentId, existingItem.quantity + quantity);
            console.log("Quantity updated");
        } else {
            if (!product.id) {
                console.error("Error: Product ID is missing");
                return;
            }

            await addToCart(product.id, quantity);
            console.log("Product added to cart");
        }
    };


    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + (item.price || 0) * (item.quantity || 0),
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


    const handleUpdateCartQuantity = (itemId, newQuantity) => {
        console.log("enter")
        if (newQuantity < 1) {
            console.log("check", itemId, newQuantity)
            removeItem(itemId);
            if (itemId === product.id) setQuantity(1);
            return;
        }

        if (newQuantity > MAX_QUANTITY) {
            alert(`Maximum quantity is ${MAX_QUANTITY}`);
            return;
        }

        handleQuantity(itemId, newQuantity);
        if (itemId === product.id) setQuantity(newQuantity);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!user) {
            // If not logged in, redirect to login with return URL
            router.push(`/login?returnTo=${encodeURIComponent("/checkout")}`);
            setIsCartOpen(false);
            return;
        }

        // If logged in, proceed to contact/checkout page
        setIsCartOpen(false);
        router.push("/checkout");
    };

    return (
        <>
            <div className="min-h-screen mt-[100px] bg-[#FAF9F6]">
                <div className="max-w-[1370px] mx-auto px-4 py-8">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="grid md:grid-cols-2 gap-12 p-8 lg:p-16">
                            {/* Left: Product Image Gallery */}
                            <div>
                                <div className="mb-4">
                                    <img
                                        src={product?.productImgs[selectedImage].url}
                                        alt={`${product.title} - View ${selectedImage + 1}`}
                                        className="w-full h-[400px] rounded-lg shadow-md object-contain"
                                    />
                                </div>

                                {/* Thumbnail Gallery */}
                                {product?.productImgs.length > 1 && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {product?.productImgs.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`bg-gray-50 rounded-xl p-2 transition-all ${selectedImage === index ? "ring-2 ring-[#916a6b]" : "border border-gray-100"
                                                    }`}
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={`${product.title} - Thumbnail ${index + 1}`}
                                                    className="w-full h-20 object-contain rounded"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Product Details */}
                            <div>
                                <h1 className="text-4xl text-gray-900 font-black mb-6 tracking-tight">
                                    {product?.title}
                                </h1>
                                <p className="text-3xl text-[#916a6b] font-black mb-8">
                                    ${product?.price}
                                </p>

                                <div className="mb-6">
                                    <p className="text-gray-800 leading-relaxed mb-4">{product?.description}</p>
                                    <ul className="space-y-3 text-gray-800">
                                        {product?.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start text-gray-800"
                                            >
                                                <span className="mr-2 mt-1 text-gray-800">•</span>
                                                <span className="flex-1 text-gray-800">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <span className="text-gray-700">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            className="p-2 bg-gray-50 hover:bg-gray-100 border-r text-gray-600 transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>

                                        <input
                                            type="number"
                                            min="1"
                                            max={MAX_QUANTITY}
                                            value={quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(parseInt(e.target.value) || 1)
                                            }
                                            className="w-16 text-center border-x py-1 text-gray-700"
                                        />

                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            className="p-2 bg-gray-50 hover:bg-gray-100 border-l text-gray-600 transition-colors"
                                            disabled={quantity >= MAX_QUANTITY}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {quantity >= MAX_QUANTITY && (
                                        <span className="text-sm text-red-500">
                                            Maximum quantity reached
                                        </span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex items-center justify-center w-full cursor-pointer gap-3 bg-[#916a6b] text-white px-8 py-5 rounded-2xl hover:bg-[#7a595a] transition-all font-black uppercase tracking-widest shadow-xl shadow-rose-900/10 active:scale-[0.98]"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {Object.values(allProducts)
                                .filter((item) => item.slug !== product.slug)
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleProductClick(item.slug)}
                                        className="bg-white rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all p-4 md:p-6 cursor-pointer border border-gray-50 group flex flex-col"
                                    >
                                        <div className="overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-6 bg-gray-50 p-2 md:p-4">
                                            <img
                                                src={item.productImgs[0].url}
                                                alt={item.title}
                                                className="w-full h-32 md:h-56 object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 truncate px-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-[#916a6b] font-black text-sm md:text-lg px-1">${item.price}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Shopping Cart Slide-out */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
                    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FAF9F6] shadow-2xl">
                        <div className="flex flex-col h-full">
                            {/* Cart Header */}
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

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {cartItems.length === 0 ? (
                                    <div className="h-full flex items-center justify-center">
                                        <p className="text-center text-gray-400 font-medium">
                                            Your cart is empty
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-50"
                                            >
                                                <img
                                                    src={item.productImgs?.[0]?.url || item.images?.[0] || item.image || ""}
                                                    alt={item.title || item.name}
                                                    className="w-20 h-20 object-contain rounded-xl bg-gray-50 p-1"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 leading-tight">
                                                                {item.title || item.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-400 font-medium mt-1">
                                                                ${item.price || 0} each
                                                            </p>
                                                        </div>
                                                        <span className="text-lg font-black text-[#916a6b]">
                                                            ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center mt-4 p-1 bg-gray-50 rounded-xl w-fit border border-gray-100">
                                                        <button
                                                            onClick={() => handleUpdateCartQuantity(item.documentId, item.quantity - 1)}
                                                            className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 hover:text-[#916a6b] transition-all"
                                                            disabled={item.quantity < 1}
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>

                                                        <span className="px-4 font-black text-gray-900 min-w-[40px] text-center">
                                                            {item.quantity}
                                                        </span>

                                                        <button 
                                                            onClick={() => handleUpdateCartQuantity(item.documentId, item.quantity + 1)}
                                                            className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-500 hover:text-[#916a6b] transition-all"
                                                            disabled={item.quantity >= MAX_QUANTITY}
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>

                                                        <div className="w-px h-4 bg-gray-200 mx-2" />

                                                        <button
                                                            onClick={() => removeItem(item.documentId)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                                            aria-label="Remove item"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cart Footer */}
                            {cartItems.length > 0 && (
                                <div className="border-t border-gray-100 p-8 bg-white space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                                            <span>Subtotal</span>
                                            <span className="font-black text-xl text-[#916a6b]">
                                                ${calculateTotal().toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium text-center">
                                        Shipping, taxes, and discount codes calculated at checkout.
                                    </p>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-[#916a6b] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-[#7a595a] transition-all shadow-xl hover:shadow-rose-900/10 active:scale-[0.98]"
                                    >
                                        Check out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
