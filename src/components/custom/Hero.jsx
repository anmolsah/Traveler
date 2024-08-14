import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const videoSources = [
    "/vidoes/v-0.mp4",
    "/vidoes/v-2.mp4",
    "/vidoes/v-3.mp4",
    "/vidoes/v-5.mp4",
    "/vidoes/v-6.mp4",
  ];

  useEffect(() => {
    const handleVideoEnd = () => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % videoSources.length
      );
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener("ended", handleVideoEnd);

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnd);
    };
  }, [videoSources.length]);

  return (
    <div className="flex flex-col items-center mx-4 md:mx-16 lg:mx-24 xl:mx-56 gap-6 lg:gap-9">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-center mt-8 md:mt-12 lg:mt-16">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185]">
          Discover Your Next Adventure With Rahi:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center">
        From hidden gems to iconic landmarks, Rahi turns your travel dreams into
        unforgettable adventures. Let’s create memories together!
      </p>

      <Link to={"/create-trip"}>
        <Button className="font-medium text-sm sm:text-base md:text-lg mt-5 lg:mt-7">
          Get Started, It's Free
        </Button>
      </Link>

      <img src="/rahi1.png" className="mt-5" />

      <video
        src={videoSources[currentVideoIndex]}
        className="w-[800px] h-auto shadow-md border-red-500 rounded-2xl hover:scale-105 transition-all"
        autoPlay
        muted
        playsInline
        ref={videoRef}
      ></video>

      <img src="/rahiHome3.png" className="mt-4" />
      <img src="/rahiHome2.png" className="mt-4" />
      <img src="/rahi5.png" className="mt-4" />
    </div>
  );
}

export default Hero;
