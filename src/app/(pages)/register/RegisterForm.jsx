"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Add this import



export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth(); // Add this hook

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Validation states
    const [validationErrors, setValidationErrors] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Email format validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Form validation
    const validateForm = () => {
        console.log("🔍 Validating form fields...");
        const errors = {};
        let isValid = true;

        // Check empty fields
        Object.keys(formData).forEach((field) => {
            if (!formData[field].trim()) {
                errors[field] = `${field} is required`;
                isValid = false;
                console.log(`❌ ${field} is empty`);
            }
        });

        if (formData.username) {
            if (formData.username.length < 3) {
                errors.username = "Username must be at least 3 characters";
                isValid = false;
                console.log("❌ Username too short");
            }

            // Email validation
            if (formData.email && !isValidEmail(formData.email)) {
                errors.email = "Invalid email format";
                isValid = false;
                console.log("❌ Invalid email format:", formData.email);
            }

            // Password validation
            if (formData.password) {
                if (formData.password.length < 8) {
                    errors.password = "Password must be at least 8 characters";
                    isValid = false;
                    console.log("❌ Password too short");
                }
            }

            // Password match validation
            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
                isValid = false;
                console.log("❌ Passwords don't match");
            }

            setValidationErrors(errors);
            console.log(
                isValid ? "✅ Form validation passed" : "❌ Form validation failed"
            );
            return isValid;
        };
    }
    // Check if email exists
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
    
        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        const requestBody = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName, // Ensure Strapi allows this field
            lastName: formData.lastName,  // Ensure Strapi allows this field
        };
    
        // Register the user directly
        try {
            await register({...requestBody});
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    };
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(`📝 Field "${name}" updated:`, value);

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear validation error
        setValidationErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] py-12 mt-12 px-4">

            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Create Account</h2>
                    <p className="mt-2 text-gray-600">Sign up to get started</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="bg-white p-10 rounded-[2rem] shadow-2xl shadow-slate-900/5 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className={`mt-1 block w-full px-4 py-3 text-black rounded-xl border bg-gray-50 ${validationErrors.firstName
                                        ? "border-red-500 ring-1 ring-red-500"
                                        : "border-gray-100 focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B]"
                                        } transition-all focus:outline-none`}
                                />
                                {validationErrors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {validationErrors.firstName}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className={`mt-1 block w-full px-4 py-3 text-black rounded-xl border bg-gray-50 ${validationErrors.lastName
                                        ? "border-red-500 ring-1 ring-red-500"
                                        : "border-gray-100 focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B]"
                                        } transition-all focus:outline-none`}
                                />
                                {validationErrors.lastName && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {validationErrors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className={`mt-1 block w-full px-4 py-3 text-black rounded-xl border bg-gray-50 ${validationErrors.username
                                    ? "border-red-500 ring-1 ring-red-500"
                                        : "border-gray-100 focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B]"
                                    } transition-all focus:outline-none`}
                            />
                            {validationErrors.username && (
                                <p className="mt-1 text-sm text-red-500">
                                    {validationErrors.username}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`mt-1 block w-full px-4 py-3 text-black rounded-xl border bg-gray-50 ${validationErrors.email 
                                    ? "border-red-500 ring-1 ring-red-500" 
                                    : "border-gray-100 focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B]"
                                    } transition-all focus:outline-none`}
                            />
                            {validationErrors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {validationErrors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className={`mt-1 block w-full px-4 py-3 text-black rounded-xl border bg-gray-50 ${validationErrors.password
                                    ? "border-red-500 ring-1 ring-red-500"
                                    : "border-gray-100 focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B]"
                                    } transition-all focus:outline-none`}
                            />
                            {validationErrors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {validationErrors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className={`mt-1 block w-full px-4 py-3 text-black rounded-xl border bg-gray-50 ${validationErrors.confirmPassword
                                    ? "border-red-500 ring-1 ring-red-500"
                                    : "border-gray-100 focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B]"
                                    } transition-all focus:outline-none`}
                            />
                            {validationErrors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {validationErrors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#1E293B] text-white py-4 px-6 rounded-xl shadow-xl shadow-slate-900/10 hover:bg-[#334155] transition-all font-black uppercase tracking-widest active:scale-[0.98] ${isLoading ? "opacity-75 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#1E293B] font-bold hover:text-[#334155] transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
