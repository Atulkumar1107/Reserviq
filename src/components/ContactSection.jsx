"use client";
import React, { useState } from "react";
import { Send, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bookingReference: "",
    message: "",
    hasReadPrivacy: false,
  });

  const [focusedField, setFocusedField] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hasReadPrivacy) {
      setErrorMessage("You must agree to the Privacy Policy.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          bookingReference: formData.bookingReference,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        bookingReference: "",
        message: "",
        hasReadPrivacy: false,
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center p-4 lg:p-6">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-gray-100">

        {/* LEFT SIDE - FORM */}
        <div className="w-full lg:w-3/5 p-6 lg:p-10">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Message Sent Successfully
              </h2>
              <p className="text-gray-600">
                Our Reserviq support team will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Contact Reserviq Support
              </h2>

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#1E293B] outline-none"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#1E293B] outline-none"
                  required
                />

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#1E293B] outline-none"
                />

                <input
                  type="text"
                  name="bookingReference"
                  placeholder="Booking Reference (Optional)"
                  value={formData.bookingReference}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#1E293B] outline-none"
                />
              </div>

              <textarea
                name="message"
                placeholder="Describe your inquiry*"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#1E293B] outline-none h-32 resize-none"
                required
              />

              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="hasReadPrivacy"
                  checked={formData.hasReadPrivacy}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#1E293B] focus:ring-[#1E293B]"
                />
                <span>I agree to the Privacy Policy*</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1E293B] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#334155] transition disabled:opacity-60"
              >
                {isLoading ? "Sending..." : "Submit Request"}
                {!isLoading && <Send size={18} />}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT SIDE - IMAGE + INFO */}
        <div className="w-full lg:w-2/5 bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0] p-6 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
          <div className="space-y-6">

            <img
              src="https://res.cloudinary.com/dwau5poqz/image/upload/v1771519314/0oH-Oa2QuL_BkD9rg6FFbF1uZ5B0RxH1N4iFpxhbDdVUVrQ3QPSCuCdS0T99u2q6DCcZl1QLm6TORuNtvHCPU8LGGSKrRnn-q3pKtwiv_L8_hpc73o.jpg"
              alt="Room booking support"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />

            <h3 className="text-2xl font-bold text-[#1E293B]">
              Need Help With Your Reservation?
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Whether you have questions about availability, booking confirmation,
              or managing your reservations, our team is here to assist you
              quickly and professionally.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-xl border text-center">
                <p className="text-xs text-gray-400 uppercase">Response Time</p>
                <p className="font-bold text-[#1E293B]">Under 24h</p>
              </div>
              <div className="p-4 bg-white rounded-xl border text-center">
                <p className="text-xs text-gray-400 uppercase">Support Hours</p>
                <p className="font-bold text-[#1E293B]">Mon - Fri</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;