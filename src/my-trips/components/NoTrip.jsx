import React from 'react'
import { AiOutlineFrown } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function NoTrip() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
          <AiOutlineFrown className="text-6xl text-gray-500 mb-4" />
          <h2 className="text-2xl font-bold text-[#364F6B] mb-2">
            Oops! No Trips Found
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            It looks like you haven't planned any trips yet. Let's get started by adding your dream destinations!
          </p>
         <Link to={"/create-trip"}>
         <button className="px-6 py-2 bg-[#3FC1C9] text-white rounded-lg hover:bg-[#FC5185] transition-all">
            Add Your First Trip
          </button>
         </Link>
        </div>
      );
}

export default NoTrip