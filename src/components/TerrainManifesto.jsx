import React from "react";

const TerrainManifesto = () => {
const terrainData = {
  title: "Where Smart Booking Meets Seamless Comfort",
  description:
    "Reserviq simplifies the way you discover and reserve rooms. Designed for clarity and efficiency, our platform helps you check availability, manage bookings, and confirm stays effortlessly. Whether for business or leisure, Reserviq ensures every booking is smooth, secure, and stress-free.",
};


  return (
    <div className="bg-[#FAF9F6] py-24 px-4 md:px-8 border-y border-gray-100/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-[#1E293B] font-extrabold md:text-5xl text-center mb-8 tracking-tight">
          {terrainData.title}
        </h2>

        <p className="text-lg md:text-xl text-gray-600 text-center leading-relaxed font-medium max-w-3xl mx-auto">
          {terrainData.description}
        </p>
      </div>
    </div>
  );
};

export default TerrainManifesto;
