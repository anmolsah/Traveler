

import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-2 text-[#364F6B]">Places To Visit</h2>

      <div>
        {trip?.tripData?.travel_plan?.itinerary.map((item, index) => (
          <div className="mt-5" key={index}>
            <h2 className="font-medium text-lg text-[#3FC1C9]">Day {item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5 bg-[#white] p-4 rounded-lg">
              {item?.places.map((place, index) => (
                <div key={index} className="border-l-4 border-[#FC5185] p-2">
                  <h2 className="font-medium text-sm text-[#FC5185]">{place?.best_time_to_visit}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
