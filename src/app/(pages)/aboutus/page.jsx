import ContactSection from "@/components/ContactSection";
import React from "react";

import {
  aboutData,
  missionData,
  cardData,
  AboutProductData,
  contactData,
} from "@/data/aboutData";

export default function AboutUs() {
  const { mission } = missionData;
  const { section } = AboutProductData;

  return (
    <div className="relative w-full min-h-[500px] overflow-hidden">
      <div className="absolute h-[500px] inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[500px] object-fill"
        >
          <source src={aboutData.backgroundVideo.url} />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="relative min-h-[500px] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-serif text-white mb-6 tracking-wider">
          {aboutData.title}
        </h1>

        <div className="flex flex-col backdrop-blur-[2px] md:flex-row items-center gap-2 md:gap-4 text-black tracking-widest text-sm md:text-xl">
          {aboutData.Slogan.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item.text}</span>
              {index < aboutData.Slogan.length - 1 && (
                <span className="hidden md:inline">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="relative bg-[#FAF9F6] py-16 px-4">
        <div className="max-w-4xl -mb-8 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl text-[#1E293B] font-black font-serif mb-8 uppercase tracking-tight">
            {mission.title}
          </h2>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-gray-700 font-medium">
            {mission.description}
          </p>
        </div>
      </div>

      <div className="relative bg-[#FAF9F6] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardData.card.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 overflow-hidden border border-gray-50 hover:shadow-slate-900/10 transition-shadow duration-500"
              >
                <img
                  className="w-full h-64 object-cover"
                  src={item.image.url}
                  alt={item.title}
                />
                <div className="p-8">
                  <h3 className="text-2xl font-black font-serif text-[#1E293B] mb-4 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-[#FAF9F6] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl text-[#1E293B] font-black font-serif mb-8 uppercase tracking-tight">
            {section.title}
          </h2>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-gray-700 font-medium">
            {section.description}
          </p>
        </div>
      </div>

      <ContactSection contactData={contactData} />
    </div>
  );
}
