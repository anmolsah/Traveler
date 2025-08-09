import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Sarah Johnson",
            location: "New York, USA",
            rating: 5,
            text: "RAHi planned the most incredible 10-day European adventure for me! Every detail was perfect, from the cozy hotels to the hidden local gems I never would have found on my own.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Michael Chen",
            location: "Toronto, Canada",
            rating: 5,
            text: "As a busy professional, I don't have time to research trips. RAHi's AI created a perfect itinerary for my family vacation to Japan. The kids loved every activity!",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Emma Rodriguez",
            location: "Barcelona, Spain",
            rating: 5,
            text: "The budget tracking feature saved me so much money! RAHi helped me stick to my budget while still having an amazing time exploring Southeast Asia.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "David Kim",
            location: "Seoul, South Korea",
            rating: 5,
            text: "I've used many travel apps, but RAHi is different. The local information and cultural tips made me feel like a local everywhere I went. Absolutely brilliant!",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Loved by Travelers Worldwide
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join thousands of happy travelers who trust RAHi for their adventures
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                        <FaQuoteLeft className="text-4xl text-[#3FC1C9] mb-6" />

                        <div className="transition-all duration-500 ease-in-out">
                            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                                "{testimonials[currentTestimonial].text}"
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={testimonials[currentTestimonial].avatar}
                                        alt={testimonials[currentTestimonial].name}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-[#3FC1C9]"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-lg">
                                            {testimonials[currentTestimonial].name}
                                        </h4>
                                        <p className="text-gray-600">
                                            {testimonials[currentTestimonial].location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-1">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 text-xl" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation dots */}
                        <div className="flex justify-center space-x-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                            ? 'bg-[#3FC1C9] scale-125'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
                        <div>
                            <div className="text-3xl font-bold text-[#364F6B] mb-2">50K+</div>
                            <div className="text-gray-600">Trips Planned</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#364F6B] mb-2">4.9/5</div>
                            <div className="text-gray-600">User Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#364F6B] mb-2">150+</div>
                            <div className="text-gray-600">Countries</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#364F6B] mb-2">24/7</div>
                            <div className="text-gray-600">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;