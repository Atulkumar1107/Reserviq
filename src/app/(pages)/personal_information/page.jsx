import React from "react";
import { ChevronRight } from "lucide-react";

export default function PersonalInformation() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-[100px]">
      {/* Hero Banner Section */}
      <div className="relative h-96 flex items-center justify-center text-white">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('/images/resource_3.jpg')`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 text-center">
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tight">
            Personal Information
          </h1>

          <div className="flex items-center justify-center gap-2 text-lg">
            <a href="/" className="hover:text-[#1E293B] transition-colors">
              Home
            </a>
            <ChevronRight size={20} />
            <span className="text-[#1E293B] font-bold">
              Personal Information
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose">
          
          <div className="mt-8 text-xl text-gray-900 font-bold border-t border-gray-100 pt-8">
            Please note that some calls may be recorded for quality and training
            purposes.
          </div>

        </div>
      </div>
    </div>
  );
}
