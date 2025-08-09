import { db } from "@/config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import UserTripCard from "./components/UserTripCard";
import NoTrip from "./components/NoTrip";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    GetUserTrips();
  }, []);

  useEffect(() => {
    filterAndSortTrips();
  }, [userTrips, searchTerm, sortBy, filterBy]);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );

      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTrips = () => {
    let filtered = [...userTrips];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(trip =>
        trip.userSelection?.location?.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.userSelection?.budget?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.userSelection?.traveler?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterBy !== "all") {
      filtered = filtered.filter(trip => {
        switch (filterBy) {
          case "solo":
            return trip.userSelection?.traveler === "1";
          case "couple":
            return trip.userSelection?.traveler === "2";
          case "family":
            return trip.userSelection?.traveler?.includes("2-6");
          case "friends":
            return trip.userSelection?.traveler?.includes("2-10");
          case "budget":
            return trip.userSelection?.budget === "Cheap";
          case "luxury":
            return trip.userSelection?.budget === "Luxury";
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.id) - new Date(a.id);
        case "oldest":
          return new Date(a.id) - new Date(b.id);
        case "location":
          return (a.userSelection?.location?.label || "").localeCompare(
            b.userSelection?.location?.label || ""
          );
        case "duration":
          return (b.userSelection?.noOfDays || 0) - (a.userSelection?.noOfDays || 0);
        default:
          return 0;
      }
    });

    setFilteredTrips(filtered);
  };

  const deleteTrip = async (tripId) => {
    if (!confirm("Are you sure you want to delete this trip?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      setUserTrips((prevTrips) =>
        prevTrips.filter((trip) => trip.id !== tripId)
      );
      toast.success("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    }
  };

  const duplicateTrip = (trip) => {
    // Navigate to create trip with pre-filled data
    navigate("/create-trip", {
      state: {
        prefillData: trip.userSelection
      }
    });
  };

  if (loading) {
    return (
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-3xl text-[#364F6B]">My Trips</h2>
        <Button
          onClick={() => navigate("/create-trip")}
          className="bg-[#3FC1C9] hover:bg-[#FC5185]"
        >
          ✈️ Plan New Trip
        </Button>
      </div>

      {userTrips.length > 0 && (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Trips
                </label>
                <Input
                  placeholder="Search by destination, budget, or traveler type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter By
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3FC1C9]"
                >
                  <option value="all">All Trips</option>
                  <option value="solo">Solo Travel</option>
                  <option value="couple">Couples</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                  <option value="budget">Budget Trips</option>
                  <option value="luxury">Luxury Trips</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#3FC1C9]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="location">Location A-Z</option>
                  <option value="duration">Duration (Longest)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{userTrips.length}</div>
              <div className="text-sm text-blue-800">Total Trips</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {userTrips.reduce((sum, trip) => sum + (parseInt(trip.userSelection?.noOfDays) || 0), 0)}
              </div>
              <div className="text-sm text-green-800">Total Days</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(userTrips.map(trip => trip.userSelection?.location?.label)).size}
              </div>
              <div className="text-sm text-purple-800">Destinations</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredTrips.length}
              </div>
              <div className="text-sm text-orange-800">Showing</div>
            </div>
          </div>
        </>
      )}

      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <UserTripCard
              trip={trip}
              key={trip.id}
              onDelete={() => deleteTrip(trip.id)}
              onDuplicate={() => duplicateTrip(trip)}
            />
          ))}
        </div>
      ) : userTrips.length > 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No trips match your search</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setFilterBy("all");
            }}
            className="mt-4 bg-[#3FC1C9] hover:bg-[#FC5185]"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <NoTrip />
      )}
    </div>
  );
}

export default MyTrips;
