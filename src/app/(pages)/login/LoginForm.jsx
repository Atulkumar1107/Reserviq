"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, setLoading } = useAuth(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      console.log("📝 New user redirected from registration");
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);



  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      await login(formData);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };
  
  

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === "checkbox" ? checked : value;

  console.log(`📝 Form field "${name}" updated:`, newValue);

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};

return (
  <>
    <div className="min-h-screen bg-[#FAF9F6] py-12 mt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to manage your room reservations
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
            Registration successful! Please sign in with your new account.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white py-10 px-6 shadow-2xl shadow-slate-900/5 rounded-[2rem] border border-gray-100 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border text-black border-gray-100 bg-gray-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border text-black border-gray-100 bg-gray-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-[#1E293B] transition-all"
              />
            </div>

            <div className="flex items-center justify-between">
             

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-bold text-[#1E293B] hover:text-[#334155] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-xl shadow-slate-900/10 text-sm font-black uppercase tracking-widest text-white bg-[#1E293B] hover:bg-[#334155] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E293B] active:scale-[0.98] transition-all ${isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#916a6b] hover:text-[#7a595a] transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  </>
);
}
