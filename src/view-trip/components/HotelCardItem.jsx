import { GetPlaceDetails, PHOTO_REF_URL } from "@/config/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState("/rahi-logo.png"); // Default image
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto = async () => {
    try {
      setLoading(true);
      const data = {
        textQuery: item?.name,
      };
      const result = await GetPlaceDetails(data);

      if (result?.data?.places?.[0]?.photos?.[0]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          result.data.places[0].photos[0].name
        );
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      // Keep default image
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(item?.name + " " + item?.address)
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl">
        <div className="relative">
          <img
            src={photoUrl}
            alt={item?.name || "Hotel"}
            className="rounded-xl w-full h-[200px] object-cover"
            onError={(e) => {
              e.target.src = "/rahi-logo.png";
            }}
          />
          {loading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
          )}
        </div>

        <div className="my-3 flex flex-col gap-2">
          <h2 className="font-semibold text-[#364F6B] text-lg line-clamp-2">
            {item?.name || "Hotel Name"}
          </h2>
          <p className="text-sm text-[#3FC1C9] line-clamp-2">
            📍 {item?.address || "Address not available"}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[#FC5185]">
              💵 {item?.price_per_night || item?.price || "Price on request"}
            </span>
            <span className="text-sm text-[#364F6B] bg-yellow-100 px-2 py-1 rounded-full">
              ⭐ {item?.rating || "N/A"}
            </span>
          </div>

          {item?.amenities && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {amenity}
                </span>
              ))}
            </div>
          )}

          {item?.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
