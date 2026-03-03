import React from "react";

const ThetaStateSection = () => {
const thetaData = {
  backImage: "https://res.cloudinary.com/dwau5poqz/image/upload/v1772552990/pexels-quang-nguyen-vinh-222549-29000012_ygcmgz.jpg",
 title: "Reserviq",

heading: "Smarter Room Booking, Simplified",

description:
  "Reserviq is a modern room reservation platform designed for clarity, speed, and reliability. Check availability in real time, confirm bookings effortlessly, and manage your stays with complete confidence — all in one seamless dashboard.",

viewBtn: {
  title: "Explore Rooms",
  url: "/dashboard",
},
};

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${thetaData.backImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      
      {/* Light Backdrop Blur Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-0" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 flex justify-end">
          <div className="bg-[#FAF9F6] rounded-2xl p-12 max-w-xl shadow-xl border border-white/50 backdrop-blur-sm">
            <div className="text-[#1E293B] uppercase tracking-[0.2em] text-xs font-bold mb-4">
              {thetaData.title}
            </div>

            <h2 className="text-4xl text-[#1E293B] font-extrabold mb-6 leading-tight tracking-tight">
              {thetaData.heading}
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
              {thetaData.description}
            </p>

            <a
              href={thetaData.viewBtn.url}
              className="bg-[#1E293B] text-white px-10 py-4 rounded-xl hover:bg-[#334155] transition-all duration-300 font-bold shadow-lg inline-block"
            >
              {thetaData.viewBtn.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThetaStateSection;
