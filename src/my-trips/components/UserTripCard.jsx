// import { GetPlaceDetails, PHOTO_REF_URL } from '@/config/GlobalApi';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { FaTrashAlt } from "react-icons/fa";

// function UserTripCard({trip,onDelete}) {
//     const [photoUrl, setPhotoUrl] = useState();

//     useEffect(() => {
//       trip && GetPlacePhoto();
//     }, [trip]);

//     const GetPlacePhoto = async () => {
//       const data = {
//         textQuery: trip?.userSelection?.location?.label,
//       };
//       const result = await GetPlaceDetails(data).then(resp => {
//         //console.log(resp.data.places[0].photos[1].name);

//         const PhotoUrl = PHOTO_REF_URL.replace(
//           "{NAME}",
//           resp.data.places[0].photos[2].name
//         );
//         setPhotoUrl(PhotoUrl);
//         //console.log(PhotoUrl);
//       })
//     }
//     return (
//       <Link to={'/view-trip/' + trip?.id}>
//         <div className="relative hover:scale-95 transition-all bg-[#F5F5F5] p-4 rounded-xl shadow-lg">
//           <img
//             src={photoUrl ? photoUrl : '/info.jpg'}
//             className="object-cover rounded-xl w-full h-[250px] mb-4"
//             alt="Trip"
//           />

//           <div>
//             <h2 className="text-lg font-bold text-[#364F6B]">
//               {trip?.userSelection?.location?.label}
//             </h2>
//             <h2 className="text-sm text-[#3FC1C9]">
//               {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget
//             </h2>
//           </div>

//           <button
//             onClick={onDelete}
//             className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//             title="Delete Trip"
//           >
//             <FaTrashAlt size={20} />
//           </button>
//         </div>
//       </Link>
//     );

// }

// export default UserTripCard

import { GetPlaceDetails, PHOTO_REF_URL } from "@/config/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaCopy, FaShare, FaCalendarAlt, FaUsers, FaDollarSign } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function UserTripCard({ trip, onDelete, onDuplicate }) {
  const [photoUrl, setPhotoUrl] = useState("/info.jpg");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      setLoading(true);
      const data = {
        textQuery: trip?.userSelection?.location?.label,
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
    } finally {
      setLoading(false);
    }
  };

  const shareTrip = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/view-trip/${trip.id}`;
    if (navigator.share) {
      navigator.share({
        title: `Trip to ${trip?.userSelection?.location?.label}`,
        text: `Check out my ${trip?.userSelection?.noOfDays} day trip!`,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      // You could show a toast here
    }
  };

  const getBudgetIcon = (budget) => {
    switch (budget) {
      case "Cheap": return "🛺";
      case "Moderate": return "🚕";
      case "Luxury": return "🚗";
      default: return "💰";
    }
  };

  const getTravelerIcon = (traveler) => {
    if (traveler === "1") return "🧳";
    if (traveler === "2") return "❤️";
    if (traveler?.includes("2-6")) return "👪";
    if (traveler?.includes("2-10")) return "🥂";
    return "👥";
  };

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative">
        <Link to={"/view-trip/" + trip?.id}>
          <div className="relative h-48 overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
            <img
              src={photoUrl}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              alt={trip?.userSelection?.location?.label}
              onError={(e) => {
                e.target.src = "/info.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={shareTrip}
            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-all"
            title="Share Trip"
          >
            <FaShare size={14} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDuplicate();
            }}
            className="bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition-all"
            title="Duplicate Trip"
          >
            <FaCopy size={14} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            className="bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-md transition-all"
            title="Delete Trip"
          >
            <FaTrashAlt size={14} />
          </button>
        </div>

        {/* Trip Duration Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-[#3FC1C9] text-white px-3 py-1 rounded-full text-sm font-medium">
            {trip?.userSelection?.noOfDays} Days
          </span>
        </div>
      </div>

      {/* Content Section */}
      <Link to={"/view-trip/" + trip?.id}>
        <div className="p-4">
          <h2 className="text-lg font-bold text-[#364F6B] mb-2 line-clamp-2">
            {trip?.userSelection?.location?.label}
          </h2>

          {/* Trip Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">{getTravelerIcon(trip?.userSelection?.traveler)}</span>
              <span>{trip?.userSelection?.traveler === "1" ? "Solo Trip" :
                trip?.userSelection?.traveler === "2" ? "Couple Trip" :
                  trip?.userSelection?.traveler?.includes("2-6") ? "Family Trip" :
                    trip?.userSelection?.traveler?.includes("2-10") ? "Friends Trip" :
                      "Group Trip"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">{getBudgetIcon(trip?.userSelection?.budget)}</span>
              <span>{trip?.userSelection?.budget} Budget</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarAlt className="text-[#FC5185]" />
              <span>Created {formatDate(trip?.id)}</span>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-sm font-semibold text-[#364F6B]">
                {trip?.tripData?.hotels?.length || trip?.tripData?.travel_plan?.hotel?.length || 0}
              </div>
              <div className="text-xs text-gray-500">Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-[#364F6B]">
                {Object.keys(trip?.tripData?.itinerary || trip?.tripData?.travel_plan?.itinerary || {}).length}
              </div>
              <div className="text-xs text-gray-500">Days</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-[#364F6B]">
                {trip?.tripData?.transportation?.length || 0}
              </div>
              <div className="text-xs text-gray-500">Transport</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserTripCard;
