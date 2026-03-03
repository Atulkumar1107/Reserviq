'use client'
import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = ["https://res.cloudinary.com/dwau5poqz/video/upload/v1772549698/11050698-uhd_3840_2160_30fps_v0zsh0.mp4"]; // place video inside public/videos

  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative min-h-screen">
        <div className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {videos.map((videoUrl, index) => (
            <video
              key={index}
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentVideo ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
