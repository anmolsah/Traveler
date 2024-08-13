import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotel({ trip }) {
  return (
    <div className="">
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.travel_plan?.hotel?.map((item, index) => (
          <HotelCardItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotel;
