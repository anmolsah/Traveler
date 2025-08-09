import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  // Handle different possible data structures
  const itinerary = trip?.tripData?.itinerary ||
    trip?.tripData?.travel_plan?.itinerary ||
    [];

  // Convert object-based itinerary to array format
  const itineraryArray = Array.isArray(itinerary)
    ? itinerary
    : Object.keys(itinerary).map(day => ({
      day: day.replace('day_', ''),
      places: itinerary[day] || []
    }));

  return (
    <div className="mt-6">
      <h2 className="font-bold text-xl text-[#364F6B] mb-5">📍 Places To Visit</h2>

      {itineraryArray.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No itinerary available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {itineraryArray.map((dayItem, index) => (
            <div className="bg-white rounded-xl shadow-lg p-6" key={index}>
              <h3 className="font-bold text-lg text-[#3FC1C9] mb-4 flex items-center gap-2">
                📅 Day {dayItem.day}
              </h3>

              {dayItem.places && dayItem.places.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {dayItem.places.map((place, placeIndex) => (
                    <div key={placeIndex} className="border-l-4 border-[#FC5185] pl-4 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-[#FC5185] bg-pink-100 px-2 py-1 rounded-full">
                          ⏰ {place?.best_time_to_visit || 'Anytime'}
                        </span>
                        {place?.activity_duration && (
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                            🕒 {place.activity_duration}
                          </span>
                        )}
                      </div>
                      <PlaceCardItem place={place} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No places scheduled for this day</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlacesToVisit;
