import { Button } from "@/components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/config/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("/info.jpg");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      setLoading(true);
      const data = {
        textQuery: place?.place_name || place?.name,
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

  const placeName = place?.place_name || place?.name || "Unknown Place";
  const placeDescription = place?.description || "No description available";
  const travelTime = place?.travel_time || place?.estimated_travel_time || "Not specified";
  const ticketPrice = place?.ticket_pricing || "Free";

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`}
      target="_blank"
    >
      <div className="border rounded-xl p-4 mt-2 flex gap-4 hover:scale-105 transition-all hover:shadow-lg cursor-pointer bg-white">
        <div className="relative">
          <img
            className="w-[130px] h-[130px] rounded-xl object-cover"
            src={photoUrl}
            alt={placeName}
            onError={(e) => {
              e.target.src = "/info.jpg";
            }}
          />
          {loading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="font-bold text-lg text-[#364F6B] line-clamp-2">{placeName}</h2>
          <p className="text-sm text-[#51a8ad] mt-1 line-clamp-3">{placeDescription}</p>

          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span>🕒</span>
              <span className="text-gray-600">{travelTime}</span>
            </div>

            {ticketPrice !== "Free" && (
              <div className="flex items-center gap-2 text-sm">
                <span>💰</span>
                <span className="text-[#FC5185] font-medium">{ticketPrice}</span>
              </div>
            )}

            {place?.geo_coordinates && (
              <div className="flex items-center gap-2 text-sm">
                <FaMapLocationDot className="text-[#3FC1C9]" />
                <span className="text-gray-600">View on Map</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
