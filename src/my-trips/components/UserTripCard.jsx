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

import { GetPlaceDetails, PHOTO_REF_URL } from '@/config/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";

function UserTripCard({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[2].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="relative hover:scale-95 transition-all bg-[#F5F5F5] p-4 rounded-xl shadow-lg">
        <img
          src={photoUrl ? photoUrl : '/info.jpg'}
          className="object-cover rounded-xl w-full h-[200px] sm:h-[250px] mb-4"
          alt="Trip"
        />

        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#364F6B]">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-xs sm:text-sm text-[#3FC1C9]">
            {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget
          </h2>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault(); // Prevents the link from being followed on delete
            onDelete();
          }}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title="Delete Trip"
        >
          <FaTrashAlt size={18} sm={20} />
        </button>
      </div>
    </Link>
  );
}

export default UserTripCard;
