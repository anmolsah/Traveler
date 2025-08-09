import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

function TripNavigation() {
    const [activeSection, setActiveSection] = useState("");

    const sections = [
        { id: "info", label: "Trip Info", icon: "ℹ️" },
        { id: "weather", label: "Weather", icon: "🌤️" },
        { id: "hotels", label: "Hotels", icon: "🏨" },
        { id: "places", label: "Places", icon: "📍" },
        { id: "transport", label: "Transport", icon: "🚗" },
        { id: "local", label: "Local Info", icon: "🌍" },
        { id: "currency", label: "Currency", icon: "💱" },
        { id: "budget", label: "Budget", icon: "💰" },
        { id: "packing", label: "Packing", icon: "🎒" },
        { id: "share", label: "Share", icon: "📤" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.querySelector(`[data-section="${section.id}"]`);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
            <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg transition-all hover:scale-110 ${activeSection === section.id
                                ? "bg-[#3FC1C9] text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                        title={section.label}
                    >
                        {section.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TripNavigation;