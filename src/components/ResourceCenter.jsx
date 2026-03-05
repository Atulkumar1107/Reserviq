"use client";

import React from "react";

const ResourceCenter = () => {
  const title = "Why Choose Reserviq";

  const description =
    "Reserviq is built to simplify the room booking experience with real-time availability checks, secure confirmation flow, and an intuitive dashboard. Our platform ensures smooth reservations, transparent booking management, and a seamless user journey from search to confirmation.";

  const viewBtn = {
    title: "Learn More About Reserviq",
    url: "/aboutus",
  };


  // ✅ Now 3 Proper Images
  const images = [
    {
      url: "https://res.cloudinary.com/dwau5poqz/image/upload/v1772555526/pexels-cottonbro-4626357_vrnuvk.jpg",
    },
    {
      url: "https://res.cloudinary.com/dwau5poqz/image/upload/v1772554897/pexels-pavel-danilyuk-6667425_jmpzi8.jpg",
    },
    {
      url: "https://res.cloudinary.com/dwau5poqz/image/upload/v1772555593/pexels-katebranch-8725602_uucovy.jpg",
    },
  ];

  return (
    <div className="bg-[#FAF9F6] py-24 md:py-32 border-y border-gray-100/50">
      <div className="container max-w-[1370px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#1E293B] tracking-tight">
              {title}
            </h2>

            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              {description}
            </p>

            <a
              href={viewBtn.url}
              className="bg-[#1E293B] text-white px-10 py-4 rounded-xl hover:bg-[#334155] transition-all duration-300 font-bold shadow-lg hover:shadow-xl inline-block"
            >
              {viewBtn.title}
            </a>
          </div>

          {/* RIGHT IMAGES GRID */}
          <div className="grid grid-cols-2 gap-4 max-w-3xl">
            <img
              src={images[0].url}
              alt="Reserviq 1"
              className="rounded-2xl object-cover w-full h-80 shadow-lg"
            />

            <img
              src={images[1].url}
              alt="Reserviq 2"
              className="rounded-2xl object-cover w-full h-72 mt-4 shadow-lg"
            />

            <img
              src={images[2].url}
              alt="Reserviq 3"
              className="rounded-2xl object-cover w-full h-56 col-span-2 mt-4 shadow-lg"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;
