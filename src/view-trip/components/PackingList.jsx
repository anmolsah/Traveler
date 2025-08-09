import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function PackingList({ trip }) {
    const [packingItems, setPackingItems] = useState([]);
    const [customItems, setCustomItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [checkedItems, setCheckedItems] = useState(new Set());

    useEffect(() => {
        // Generate AI-suggested packing list based on trip data
        generatePackingList();

        // Load custom items and checked status from localStorage
        const savedCustomItems = localStorage.getItem(`packing_custom_${trip?.id}`);
        const savedCheckedItems = localStorage.getItem(`packing_checked_${trip?.id}`);

        if (savedCustomItems) {
            setCustomItems(JSON.parse(savedCustomItems));
        }
        if (savedCheckedItems) {
            setCheckedItems(new Set(JSON.parse(savedCheckedItems)));
        }
    }, [trip]);

    // Save to localStorage when items change
    useEffect(() => {
        if (trip?.id) {
            localStorage.setItem(`packing_custom_${trip?.id}`, JSON.stringify(customItems));
            localStorage.setItem(`packing_checked_${trip?.id}`, JSON.stringify([...checkedItems]));
        }
    }, [customItems, checkedItems, trip?.id]);

    const generatePackingList = () => {
        // Extract packing suggestions from AI response or generate based on trip details
        const aiSuggestions = trip?.tripData?.packing_list || [];

        // Default suggestions based on trip type and duration
        const defaultItems = [
            { category: "Documents", items: ["Passport/ID", "Travel insurance", "Hotel confirmations", "Flight tickets"] },
            { category: "Clothing", items: ["Comfortable walking shoes", "Weather-appropriate clothes", "Underwear", "Socks"] },
            { category: "Electronics", items: ["Phone charger", "Camera", "Power bank", "Adapter/converter"] },
            { category: "Health & Hygiene", items: ["Toothbrush", "Toothpaste", "Medications", "Hand sanitizer"] },
            { category: "Travel Essentials", items: ["Luggage locks", "Travel pillow", "Snacks", "Water bottle"] }
        ];

        // Combine AI suggestions with defaults
        const combinedItems = [...defaultItems];

        if (aiSuggestions.length > 0) {
            combinedItems.unshift({
                category: "AI Recommendations",
                items: aiSuggestions
            });
        }

        setPackingItems(combinedItems);
    };

    const addCustomItem = () => {
        if (newItem.trim()) {
            setCustomItems([...customItems, { id: Date.now(), text: newItem.trim() }]);
            setNewItem("");
        }
    };

    const removeCustomItem = (id) => {
        setCustomItems(customItems.filter(item => item.id !== id));
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(`custom_${id}`);
            return newSet;
        });
    };

    const toggleCheck = (itemId) => {
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const getProgress = () => {
        const totalItems = packingItems.reduce((sum, category) => sum + category.items.length, 0) + customItems.length;
        const checkedCount = checkedItems.size;
        return totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-[#364F6B]">🎒 Packing List</h3>
                <div className="text-right">
                    <div className="text-sm text-gray-600">Progress</div>
                    <div className="text-2xl font-bold text-[#3FC1C9]">{getProgress()}%</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                    className="bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                ></div>
            </div>

            {/* Add Custom Item */}
            <div className="flex gap-2 mb-6">
                <Input
                    placeholder="Add custom item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                    className="flex-1"
                />
                <Button onClick={addCustomItem} className="bg-[#3FC1C9] hover:bg-[#FC5185]">
                    Add
                </Button>
            </div>

            {/* Packing Categories */}
            <div className="space-y-6">
                {packingItems.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-lg text-[#364F6B] mb-3 flex items-center gap-2">
                            {category.category === "AI Recommendations" && "🤖"}
                            {category.category === "Documents" && "📄"}
                            {category.category === "Clothing" && "👕"}
                            {category.category === "Electronics" && "🔌"}
                            {category.category === "Health & Hygiene" && "🧴"}
                            {category.category === "Travel Essentials" && "✈️"}
                            {category.category}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.items.map((item, itemIndex) => {
                                const itemId = `${categoryIndex}_${itemIndex}`;
                                const isChecked = checkedItems.has(itemId);
                                return (
                                    <label key={itemIndex} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleCheck(itemId)}
                                            className="w-4 h-4 text-[#3FC1C9] rounded focus:ring-[#3FC1C9]"
                                        />
                                        <span className={`${isChecked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                            {item}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Custom Items */}
                {customItems.length > 0 && (
                    <div className="border rounded-lg p-4">
                        <h4 className="font-semibold text-lg text-[#364F6B] mb-3 flex items-center gap-2">
                            ✏️ Custom Items
                        </h4>
                        <div className="space-y-2">
                            {customItems.map((item) => {
                                const itemId = `custom_${item.id}`;
                                const isChecked = checkedItems.has(itemId);
                                return (
                                    <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleCheck(itemId)}
                                            className="w-4 h-4 text-[#3FC1C9] rounded focus:ring-[#3FC1C9]"
                                        />
                                        <span className={`flex-1 ${isChecked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                            {item.text}
                                        </span>
                                        <Button
                                            onClick={() => removeCustomItem(item.id)}
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PackingList;