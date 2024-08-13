
import { GetPlaceDetails, PHOTO_REF_URL } from "@/config/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item?.name,
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
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        item?.name +
        "," +
        item?.address
      }
      target="_blank"
    >
      <div className="hover:scale-95 transition-all cursor-pointer bg-[#fefdfd] p-4 rounded-xl shadow-md max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
        <img
          src={photoUrl}
          alt={item?.name}
          className="rounded-xl w-full h-[200px] max-h-64 object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium text-[#364F6B] text-base sm:text-lg md:text-xl">{item?.name}</h2>
          <h2 className="text-xs text-[#3FC1C9]">{item?.address}</h2>
          <h2 className="text-sm text-[#FC5185]">💵 {item?.price_per_night} per night</h2>
          <h2 className="text-sm text-[#364F6B]">⭐ {item?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
