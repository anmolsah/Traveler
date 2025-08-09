import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotel({ trip }) {
  // Handle different possible data structures
  const hotels = trip?.tripData?.hotels ||
    trip?.tripData?.travel_plan?.hotel ||
    trip?.tripData?.hotel ||
    [];

  return (
    <div className="">
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>

      {hotels.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hotel recommendations available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {hotels.map((item, index) => (
            <HotelCardItem item={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hotel;
