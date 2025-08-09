import React from "react";
import { Link } from "react-router-dom";

function Transportation({ trip }) {
    // Extract transportation data from trip
    const transportationOptions = trip?.tripData?.transportation || [];
    const location = trip?.userSelection?.location?.label || "";

    const defaultTransportOptions = [
        {
            type: "Taxi/Rideshare",
            cost: "$10-30 per ride",
            description: "Convenient door-to-door service via Uber, Lyft, or local taxis",
            icon: "🚕",
            pros: ["Door-to-door", "Available 24/7", "No waiting"],
            cons: ["More expensive", "Traffic dependent"]
        },
        {
            type: "Public Transit",
            cost: "$2-5 per ride",
            description: "Buses, trains, and metro systems",
            icon: "🚌",
            pros: ["Cost-effective", "Eco-friendly", "Local experience"],
            cons: ["Fixed schedules", "May be crowded"]
        },
        {
            type: "Car Rental",
            cost: "$30-80 per day",
            description: "Rent a car for maximum flexibility",
            icon: "🚗",
            pros: ["Complete freedom", "Good for groups", "Luggage space"],
            cons: ["Parking costs", "Traffic/navigation", "Insurance needed"]
        },
        {
            type: "Walking/Cycling",
            cost: "Free - $20/day",
            description: "Explore on foot or rent a bike",
            icon: "🚶‍♂️",
            pros: ["Free/cheap", "Healthy", "See more details"],
            cons: ["Weather dependent", "Limited distance", "Physical effort"]
        }
    ];

    const transportOptions = transportationOptions.length > 0 ? transportationOptions : defaultTransportOptions;

    const getBookingLinks = (type) => {
        const links = {
            "Taxi/Rideshare": [
                { name: "Uber", url: "https://uber.com" },
                { name: "Lyft", url: "https://lyft.com" }
            ],
            "Car Rental": [
                { name: "Hertz", url: "https://hertz.com" },
                { name: "Enterprise", url: "https://enterprise.com" },
                { name: "Budget", url: "https://budget.com" }
            ],
            "Public Transit": [
                { name: "Google Maps", url: `https://maps.google.com/maps?q=${encodeURIComponent(location)}` },
                { name: "Citymapper", url: "https://citymapper.com" }
            ]
        };
        return links[type] || [];
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="font-bold text-xl text-[#364F6B] mb-6 flex items-center gap-2">
                🚗 Transportation Options
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {transportOptions.map((option, index) => (
                    <div key={index} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{option.icon}</span>
                            <div>
                                <h4 className="font-semibold text-lg text-[#364F6B]">{option.type}</h4>
                                <p className="text-[#FC5185] font-medium">{option.cost}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-4">{option.description}</p>

                        {/* Pros and Cons */}
                        {option.pros && option.cons && (
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h5 className="font-medium text-green-700 mb-2">✅ Pros:</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {option.pros.map((pro, i) => (
                                            <li key={i}>• {pro}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-medium text-red-700 mb-2">❌ Cons:</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {option.cons.map((con, i) => (
                                            <li key={i}>• {con}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Booking Links */}
                        <div className="flex flex-wrap gap-2">
                            {getBookingLinks(option.type).map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.url}
                                    target="_blank"
                                    className="bg-[#3FC1C9] hover:bg-[#FC5185] text-white px-3 py-1 rounded-full text-sm transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Local Transportation Tips */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-[#364F6B] mb-2 flex items-center gap-2">
                    💡 Transportation Tips for {location}
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Download local transport apps before you arrive</li>
                    <li>• Keep cash handy as some services may not accept cards</li>
                    <li>• Check if your destination has tourist transport passes</li>
                    <li>• Consider peak hours when planning your travel times</li>
                    <li>• Always confirm the fare before starting your journey</li>
                </ul>
            </div>

            {/* Emergency Transportation */}
            <div className="mt-4 bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    🚨 Emergency Transportation
                </h4>
                <p className="text-sm text-gray-700">
                    In case of emergencies, contact local emergency services or your hotel concierge for immediate transportation assistance.
                </p>
            </div>
        </div>
    );
}

export default Transportation;