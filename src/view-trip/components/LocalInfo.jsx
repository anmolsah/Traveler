import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function LocalInfo({ trip }) {
    const [activeTab, setActiveTab] = useState("emergency");

    // Extract local info from trip data
    const localInfo = trip?.tripData?.local_info || {};
    const location = trip?.userSelection?.location?.label || "";

    const emergencyNumbers = localInfo.emergency_numbers || {
        police: "911",
        medical: "911",
        fire: "911"
    };

    const culturalTips = localInfo.cultural_tips || [
        "Research local customs and traditions before visiting",
        "Dress appropriately for religious or cultural sites",
        "Learn basic phrases in the local language",
        "Respect local dining etiquette and tipping customs",
        "Be aware of local business hours and holidays"
    ];

    const currency = localInfo.currency || "USD";
    const language = localInfo.language || "English";

    const tabs = [
        { id: "emergency", label: "🚨 Emergency", icon: "🚨" },
        { id: "culture", label: "🏛️ Culture", icon: "🏛️" },
        { id: "practical", label: "💡 Practical", icon: "💡" },
        { id: "currency", label: "💱 Currency", icon: "💱" }
    ];

    const practicalInfo = [
        { icon: "🔌", title: "Power Outlets", info: "Check local plug types and voltage" },
        { icon: "📶", title: "Internet", info: "Free WiFi available in most cafes and hotels" },
        { icon: "🚰", title: "Water", info: "Check if tap water is safe to drink" },
        { icon: "🏪", title: "Shopping Hours", info: "Most stores open 9 AM - 8 PM" },
        { icon: "💳", title: "Payment", info: "Cards widely accepted, carry some cash" },
        { icon: "🚭", title: "Smoking", info: "Check local smoking regulations" }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="font-bold text-xl text-[#364F6B] mb-6 flex items-center gap-2">
                🌍 Local Information - {location}
            </h3>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6 border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === tab.id
                                ? "bg-[#3FC1C9] text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                {activeTab === "emergency" && (
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                                🚨 Emergency Contacts
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <div className="text-2xl mb-2">👮‍♂️</div>
                                    <div className="font-semibold">Police</div>
                                    <div className="text-xl font-bold text-red-600">{emergencyNumbers.police}</div>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <div className="text-2xl mb-2">🏥</div>
                                    <div className="font-semibold">Medical</div>
                                    <div className="text-xl font-bold text-red-600">{emergencyNumbers.medical}</div>
                                </div>
                                <div className="text-center p-3 bg-white rounded-lg">
                                    <div className="text-2xl mb-2">🚒</div>
                                    <div className="font-semibold">Fire</div>
                                    <div className="text-xl font-bold text-red-600">{emergencyNumbers.fire}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-3">🏛️ Embassy Information</h4>
                            <p className="text-gray-700">
                                Contact your country's embassy or consulate in case of passport loss, legal issues, or other emergencies.
                                Keep their contact information saved in your phone.
                            </p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Important Reminders</h4>
                            <ul className="text-gray-700 space-y-1">
                                <li>• Save emergency numbers in your phone before traveling</li>
                                <li>• Keep copies of important documents in separate locations</li>
                                <li>• Share your itinerary with someone at home</li>
                                <li>• Consider travel insurance for medical emergencies</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === "culture" && (
                    <div className="space-y-4">
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                🏛️ Cultural Tips & Etiquette
                            </h4>
                            <ul className="space-y-3">
                                {culturalTips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-purple-600 mt-1">•</span>
                                        <span className="text-gray-700">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h5 className="font-semibold text-green-800 mb-2">✅ Do's</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Greet locals politely</li>
                                    <li>• Respect religious sites</li>
                                    <li>• Try local cuisine</li>
                                    <li>• Learn basic local phrases</li>
                                </ul>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <h5 className="font-semibold text-red-800 mb-2">❌ Don'ts</h5>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Don't point with your finger</li>
                                    <li>• Don't ignore dress codes</li>
                                    <li>• Don't be loud in quiet places</li>
                                    <li>• Don't refuse hospitality rudely</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "practical" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {practicalInfo.map((item, index) => (
                            <div key={index} className="bg-gray-50 border rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{item.icon}</span>
                                    <h5 className="font-semibold text-[#364F6B]">{item.title}</h5>
                                </div>
                                <p className="text-gray-600 text-sm">{item.info}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "currency" && (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                💱 Currency Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-medium mb-2">Local Currency</h5>
                                    <p className="text-2xl font-bold text-green-600">{currency}</p>
                                </div>
                                <div>
                                    <h5 className="font-medium mb-2">Primary Language</h5>
                                    <p className="text-2xl font-bold text-green-600">{language}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-semibold text-blue-800 mb-3">💳 Payment Tips</h5>
                            <ul className="text-gray-700 space-y-2">
                                <li>• Notify your bank about travel plans to avoid card blocks</li>
                                <li>• Carry a mix of cash and cards</li>
                                <li>• Use ATMs affiliated with major banks for better rates</li>
                                <li>• Keep receipts for currency exchange</li>
                                <li>• Check if your cards have foreign transaction fees</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h5 className="font-semibold text-yellow-800 mb-3">💡 Money-Saving Tips</h5>
                            <ul className="text-gray-700 space-y-2">
                                <li>• Compare exchange rates at different locations</li>
                                <li>• Avoid exchanging money at airports (usually poor rates)</li>
                                <li>• Consider using a travel-friendly credit card</li>
                                <li>• Keep small bills for tips and small purchases</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocalInfo;