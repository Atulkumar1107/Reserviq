"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, setLoading } = useAuth(); // Add this hook

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

    
    // const rememberedEmail = typeof window === "undefined" ? '' : localStorage.getItem("lastLoggedInEmail");
    // if (rememberedEmail) {
    //   console.log("🔄 Found remembered email:", rememberedEmail);
    //   setFormData((prev) => ({
    //     ...prev,
    //     email: rememberedEmail,
    //     rememberMe: true,
    //   }));
    // }
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
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to manage your room reservations
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
            Registration successful! Please sign in with your new account.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white py-10 px-6 shadow-2xl shadow-slate-900/5 rounded-[2rem] border border-gray-100 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#609966] focus:ring-[#609966] border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div> */}

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-bold text-[#1E293B] hover:text-[#334155] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
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

          {/* Social Login Section */}
          {/* <div className="mt-6">
              <div className="relative"> */}
          {/* <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div> */}
          {/* <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div> */}
          {/* </div> */}

          {/* <div className="mt-6 grid grid-cols-2 gap-3"> */}
          {/* Google Login */}
          {/* <button
                  type="button"
                  onClick={() => console.log("🔗 Google login clicked")}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  <span className="ml-2">Google</span>
                </button> */}

          {/* Twitter Login */}
          {/* <button
                  type="button"
                  onClick={() => console.log("🔗 Twitter login clicked")}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="ml-2">Twitter</span>
                </button> */}
          {/* </div>
            </div> */}
        </div>

        {/* Sign Up Link */}
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
