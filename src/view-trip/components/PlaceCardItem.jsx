

import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/config/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.name,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.name}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-95 transition-all hover:shadow-md cursor-pointer bg-[#fefcfc]">
        <img
          className="w-[130px] h-[130px] rounded-xl"
          src={photoUrl ? photoUrl : "/info.jpg"}
        />

        <div>
          <h2 className="font-bold text-lg text-[#364F6B]">{place?.name}</h2>
          <p className="text-sm text-[#51a8ad]">{place?.description}</p>
          <h2 className="mt-2 text-md text-[#120b0d]">
            🕖 {place?.estimated_travel_time}
          </h2>
          {/* //<Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

