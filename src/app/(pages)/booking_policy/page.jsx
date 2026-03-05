import React from "react";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { bookingPolicyData } from "@/data/shippingPolicyData";

export const metadata = {
  title: "Booking & Cancellation Policy | Reserviq",
  description: "Read our booking and cancellation policies to ensure a smooth reservation process.",
};

export default function BookingPolicy() {
  const { hero, content } = bookingPolicyData;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-[100px]">
      <div className="relative h-96 flex items-center justify-center text-white">
        
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${hero.backgroundImage})`,
          }}
        />

        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 text-center">
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tight">
            {hero.title}
          </h1>

          <div className="flex items-center justify-center gap-2 text-lg">
            {hero.breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {item.link ? (
                  <a
                    href={item.link}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-white font-bold">
                    {item.label}
                  </span>
                )}
                {index < hero.breadcrumb.length - 1 && (
                  <ChevronRight size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose max-w-none">

          <h2 className="text-gray-900 text-xl mb-8 font-medium">
            {content.intro}
          </h2>

          {content.sections.map((section, index) => (
            <div key={index} className="mb-10">
              <h3 className="text-2xl font-black mb-6 text-[#1E293B] uppercase tracking-tight">
                {section.title}
              </h3>

              <ol className="list-decimal space-y-3 text-gray-800">
                {section.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ol>
            </div>
          ))}

          <div className="mt-8 text-xl text-gray-900 font-bold border-t border-gray-100 pt-8">
            {content.note}
          </div>

        </div>
      </div>
    </div>
  );
}
