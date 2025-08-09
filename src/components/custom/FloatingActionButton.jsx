import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FaPlus, FaRocket, FaTimes } from "react-icons/fa";

function FloatingActionButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsExpanded(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const quickActions = [
        {
            icon: FaRocket,
            label: "Plan Trip",
            action: "/create-trip",
            color: "from-[#3FC1C9] to-[#FC5185]"
        },
        {
            icon: FaPlus,
            label: "My Trips",
            action: "/my-trips",
            color: "from-[#364F6B] to-[#3FC1C9]"
        }
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Quick Actions */}
            {isExpanded && (
                <div className="mb-4 space-y-3">
                    {quickActions.map((action, index) => (
                        <Link key={index} to={action.action}>
                            <div className="flex items-center justify-end group">
                                <div className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    {action.label}
                                </div>
                                <Button
                                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} hover:scale-110 transition-all duration-300 shadow-lg`}
                                >
                                    <action.icon className="text-white" />
                                </Button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Main FAB */}
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-14 h-14 rounded-full bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] hover:from-[#FC5185] hover:to-[#3FC1C9] shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 ${isExpanded ? 'rotate-45' : 'rotate-0'
                    }`}
            >
                {isExpanded ? (
                    <FaTimes className="text-white text-xl" />
                ) : (
                    <FaPlus className="text-white text-xl" />
                )}
            </Button>
        </div>
    );
}

export default FloatingActionButton;