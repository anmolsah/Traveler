import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FaPlay, FaPause, FaArrowRight, FaStar, FaUsers, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import Testimonials from "./Testimonials";
import Footer from "@/view-trip/components/Footer";

function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  const videoSources = [
    "/vidoes/v-0.mp4",
    "/vidoes/v-2.mp4",
    "/vidoes/v-3.mp4",
    "/vidoes/v-5.mp4",
    "/vidoes/v-6.mp4",
  ];

  const stats = [
    { icon: FaUsers, number: "10K+", label: "Happy Travelers" },
    { icon: FaMapMarkerAlt, number: "500+", label: "Destinations" },
    { icon: FaStar, number: "4.9", label: "Average Rating" },
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Itineraries",
      description: "Smart trip planning with personalized recommendations",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: "🌤️",
      title: "Real-time Weather",
      description: "Live weather updates for perfect packing",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: "💰",
      title: "Budget Tracking",
      description: "Keep expenses in check with smart tracking",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "🎒",
      title: "Smart Packing Lists",
      description: "AI-generated packing suggestions",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "🚗",
      title: "Transportation Guide",
      description: "Local transport options and booking links",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🌍",
      title: "Local Information",
      description: "Cultural tips and emergency contacts",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: "💱",
      title: "Currency Converter",
      description: "Real-time exchange rates and calculations",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "📤",
      title: "Trip Sharing",
      description: "Share itineraries and export as PDF",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "🏨",
      title: "Hotel Recommendations",
      description: "Curated accommodations with photos and reviews",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    const handleVideoEnd = () => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % videoSources.length
      );
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [videoSources.length]);

  const toggleVideoPlayback = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isVideoPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Main Heading */}
            <div className="mb-8">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
                <span className="text-sm font-medium text-blue-800">✨ AI-Powered Travel Planning</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block text-gray-900 mb-2">Discover Your Next</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] via-[#3FC1C9] to-[#FC5185] animate-gradient">
                  Adventure
                </span>
                <span className="block text-gray-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mt-4">
                  with RAHi
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Transform your travel dreams into reality with personalized itineraries,
              <span className="text-[#3FC1C9] font-semibold"> AI-powered recommendations</span>, and
              comprehensive trip planning tools.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/create-trip">
                <Button className="group bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] hover:from-[#FC5185] hover:to-[#3FC1C9] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Start Planning Free
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-gray-300 hover:border-[#3FC1C9] hover:text-[#3FC1C9] transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
              <video
                ref={videoRef}
                src={videoSources[currentVideoIndex]}
                className="w-full h-auto rounded-2xl"
                autoPlay
                muted
                playsInline
              />

              {/* Video Controls */}
              <button
                onClick={toggleVideoPlayback}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
              >
                {isVideoPlaying ? <FaPause /> : <FaPlay />}
              </button>

              {/* Video Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {videoSources.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentVideoIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-medium text-blue-800">🚀 Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3FC1C9] to-[#FC5185]">
                Perfect Trip
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              RAHi combines cutting-edge AI with comprehensive travel tools to create your ideal journey.
              From planning to packing, we've got every aspect of your trip covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 hover:border-transparent overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <Link to="/create-trip">
                <Button className="group bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] hover:from-[#FC5185] hover:to-[#3FC1C9] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Try All Features Free
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-gray-500 text-sm">No credit card required • Start planning in seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-2 mb-6 shadow-md">
              <span className="text-sm font-medium text-gray-800">⚡ Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Plan Your Trip in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3FC1C9] to-[#FC5185]">
                3 Easy Steps
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Tell Us Your Preferences",
                description: "Share your destination, travel dates, budget, and who you're traveling with",
                icon: "📝",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "AI Creates Your Itinerary",
                description: "Our AI analyzes thousands of options to create your perfect personalized trip",
                icon: "🤖",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Enjoy Your Adventure",
                description: "Access your complete travel guide with all the tools you need for an amazing trip",
                icon: "✈️",
                color: "from-green-500 to-teal-500"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}

                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center">
                  {/* Step Number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-lg mb-6`}>
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See RAHi in Action
            </h2>
            <p className="text-xl text-gray-600">
              Experience the power of AI-driven travel planning
            </p>
          </div>

          <div className="space-y-16">
            {/* Screenshot 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img
                src="/rahi1.png"
                alt="RAHi Dashboard"
                className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Screenshot 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FC5185] to-[#3FC1C9] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img
                src="/rahiHome3.png"
                alt="Trip Planning Interface"
                className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Screenshot 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#364F6B] to-[#3FC1C9] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img
                src="/rahiHome2.png"
                alt="Itinerary View"
                className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Screenshot 4 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3FC1C9] to-[#364F6B] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img
                src="/rahi5.png"
                alt="Mobile Experience"
                className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>


      {/* Testimonials Section */}
      <Testimonials />

      <Footer />
    </div>
  );
}

export default Hero;