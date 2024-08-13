

import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/config/GlobalApi";
import React, { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function InfoSection({ trip }) {
  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    trip && GetPlacePhotos();
  }, [trip]);

  const GetPlacePhotos = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    try {
      const resp = await GetPlaceDetails(data);
      const photos = resp.data.places[0].photos;
      const urls = photos.map((photo) =>
        PHOTO_REF_URL.replace("{NAME}", photo.name)
      );
      setPhotoUrls(urls);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Trip",
      text: `Check out my trip to ${trip?.userSelection?.location?.label}!`,
      url: window.location.href, 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Trip shared successfully!");
      } else {
        console.warn("Web Share API not supported. Fallback to manual sharing.");
      }
    } catch (error) {
      console.error("Error sharing trip:", error);
    }
  };

  return (
    <div className="bg-[#fcf6f6] p-6 rounded-xl shadow-md cursor-pointer">
      <Slider {...settings}>
        {photoUrls.map((url, index) => (
          <div key={index}>
            <img
              src={url}
              className="h-[250px] md:h-[350px] lg:h-[450px] w-full object-cover rounded-xl mb-5"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="my-5 flex flex-col gap-2 text-center md:text-left">
          <h2 className="font-bold text-xl md:text-2xl text-[#364F6B]">
            {trip?.userSelection?.location?.label}
          </h2>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-5">
            <h2 className="p-1 px-3 bg-[#3FC1C9] rounded-full text-white text-xs md:text-lg">
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-[#FC5185] rounded-full text-white text-xs md:text-lg">
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-[#3FC1C9] rounded-full text-white text-xs md:text-lg">
              🏖️ No. Of Traveller: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button onClick={handleShare} className="bg-[#364F6B] text-white hover:bg-[#3FC1C9] mt-3 md:mt-0">
          <BsSendFill />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;

