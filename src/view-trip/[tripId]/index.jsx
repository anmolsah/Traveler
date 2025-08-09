import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotel from "../components/Hotel";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
import Weather from "../components/Weather";
import BudgetTracker from "../components/BudgetTracker";
import PackingList from "../components/PackingList";
import Transportation from "../components/Transportation";
import LocalInfo from "../components/LocalInfo";
import TripSharing from "../components/TripSharing";
import CurrencyConverter from "../components/CurrencyConverter";
import TripNavigation from "../components/TripNavigation";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast.error("No trip found");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to load trip data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TripNavigation />
      <div className="p-10 md:px-20 lg:px-44 xl:px-56" data-trip-content>
        <div data-section="info">
          <InfoSection trip={trip} />
        </div>

        <div data-section="weather">
          <Weather trip={trip} />
        </div>

        <div data-section="hotels">
          <Hotel trip={trip} />
        </div>

        <div data-section="places">
          <PlacesToVisit trip={trip} />
        </div>

        <div data-section="transport">
          <Transportation trip={trip} />
        </div>

        <div data-section="local">
          <LocalInfo trip={trip} />
        </div>

        <div data-section="currency">
          <CurrencyConverter trip={trip} />
        </div>

        <div data-section="budget">
          <BudgetTracker trip={trip} />
        </div>

        <div data-section="packing">
          <PackingList trip={trip} />
        </div>

        <div data-section="share">
          <TripSharing trip={trip} />
        </div>

        <Footer trip={trip} />
      </div>
    </>
  );
}

export default ViewTrip;
