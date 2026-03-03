import React from "react";

const NatureSection = () => {
const natureData = {
  title: "Search Smart. Book Fast. Stay Confident.",
  bannerVideo: "https://res.cloudinary.com/dwau5poqz/video/upload/v1772556409/8045182-hd_1920_1080_25fps_ztiiqp.mp4",
};

  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={natureData.bannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10"></div>

      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <h2 className="text-4xl md:text-6xl backdrop-blur-[1px] text-white font-bold tracking-wider text-center px-4">
          {natureData.title}
        </h2>
      </div>
    </div>
  );
};

export default NatureSection;
