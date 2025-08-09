import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/config/AiModal";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "@/constants/Spinner";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineCalendar,
  AiOutlineEnvironment,
  AiOutlineDollar,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUsers, FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";

const showErrorToast = (message) => {
  toast.error(
    <div className="flex items-center gap-2">
      <AiOutlineExclamationCircle className="text-red-500 w-6 h-6" />
      <span className="text-sm font-medium text-red-600">{message}</span>
    </div>,
    {
      style: {
        background: "#FFF5F5",
        border: "1px solid #FF6F6F",
        boxShadow: "0px 4px 12px rgba(255, 111, 111, 0.2)",
      },
      duration: 3000,
    }
  );
};

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's prefill data from duplicating a trip
  useEffect(() => {
    if (location.state?.prefillData) {
      const prefillData = location.state.prefillData;
      setFormData(prefillData);
      if (prefillData.location) {
        setPlace(prefillData.location);
      }
    }
  }, [location.state]);

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && (value < 0 || value > 30)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.location) {
          newErrors.location = "Please select a destination";
        }
        break;
      case 2:
        if (!formData.noOfDays || formData.noOfDays < 1) {
          newErrors.noOfDays = "Please enter number of days (1-30)";
        }
        break;
      case 3:
        if (!formData.budget) {
          newErrors.budget = "Please select your budget preference";
        }
        break;
      case 4:
        if (!formData.traveler) {
          newErrors.traveler = "Please select who you're traveling with";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getStepProgress = () => {
    return (currentStep / 4) * 100;
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Validate all steps
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      showErrorToast("Please fill all the required details");
      return;
    }

    if (formData?.noOfDays > 30) {
      showErrorToast("Maximum trip duration is 30 days");
      return;
    }

    try {
      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location?.label
      )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget)
        .replace("{totalDays}", formData?.noOfDays);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      if (!result?.response?.text()) {
        throw new Error("Failed to generate trip plan");
      }

      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      showErrorToast("Failed to generate trip. Please try again.");
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
        createdAt: new Date().toISOString(),
      });

      toast.success("🎉 Your trip has been generated successfully!");
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      showErrorToast("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile information:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-medium text-blue-800">✨ AI Trip Planner</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Plan Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185]">
              Adventure
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Just provide some basic information, and our AI will generate a customized itinerary
            based on your preferences in seconds.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {[
              { step: 1, icon: FaMapMarkerAlt, label: "Destination" },
              { step: 2, icon: FaCalendarAlt, label: "Duration" },
              { step: 3, icon: FaDollarSign, label: "Budget" },
              { step: 4, icon: FaUsers, label: "Travelers" }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentStep >= item.step
                  ? 'bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] border-transparent text-white'
                  : 'border-gray-300 text-gray-400'
                  }`}>
                  {currentStep > item.step ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    <item.icon className="text-sm" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${currentStep >= item.step ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${currentStep > item.step ? 'bg-gradient-to-r from-[#3FC1C9] to-[#FC5185]' : 'bg-gray-300'
                    }`} />
                )}
              </div>
            ))}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] h-2 rounded-full transition-all duration-500"
              style={{ width: `${getStepProgress()}%` }}
            />
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">

            {/* Step 1: Destination */}
            {currentStep === 1 && (
              <div className="text-center">
                <div className="text-6xl mb-6">🌍</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#364F6B] mb-4">
                  Where do you want to go?
                </h2>
                <p className="text-gray-600 mb-8">
                  Choose your dream destination and let us plan the perfect trip for you
                </p>

                <div className="max-w-md mx-auto">
                  <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                      place,
                      onChange: (v) => {
                        setPlace(v);
                        handleInputChange("location", v);
                      },
                      placeholder: "Search for a destination...",
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          border: errors.location ? '2px solid #ef4444' : '2px solid #3FC1C9',
                          borderRadius: '12px',
                          padding: '8px',
                          fontSize: '16px',
                          '&:hover': {
                            borderColor: '#FC5185'
                          }
                        })
                      }
                    }}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <AiOutlineExclamationCircle />
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Duration */}
            {currentStep === 2 && (
              <div className="text-center">
                <div className="text-6xl mb-6">📅</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#364F6B] mb-4">
                  How long is your trip?
                </h2>
                <p className="text-gray-600 mb-8">
                  Tell us the duration of your adventure (1-30 days)
                </p>

                <div className="max-w-md mx-auto">
                  <Input
                    placeholder="Enter number of days"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.noOfDays || ''}
                    onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                    className={`text-center text-lg p-4 rounded-xl border-2 ${errors.noOfDays ? 'border-red-500' : 'border-[#3FC1C9]'
                      } focus:border-[#FC5185] focus:ring-[#FC5185]`}
                  />
                  {errors.noOfDays && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2 justify-center">
                      <AiOutlineExclamationCircle />
                      {errors.noOfDays}
                    </p>
                  )}

                  {/* Quick Select Buttons */}
                  <div className="flex gap-2 mt-6 justify-center flex-wrap">
                    {[3, 5, 7, 10, 14].map((days) => (
                      <Button
                        key={days}
                        variant="outline"
                        onClick={() => handleInputChange("noOfDays", days)}
                        className={`rounded-full ${formData.noOfDays == days
                          ? 'bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] text-white border-transparent'
                          : 'hover:border-[#3FC1C9]'
                          }`}
                      >
                        {days} days
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Budget */}
            {currentStep === 3 && (
              <div className="text-center">
                <div className="text-6xl mb-6">💰</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#364F6B] mb-4">
                  What's your budget?
                </h2>
                <p className="text-gray-600 mb-8">
                  Choose a budget range that works for you
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {SelectBudgetOptions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleInputChange("budget", item.title)}
                      className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${formData?.budget === item.title
                        ? "border-[#FC5185] bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg"
                        : "border-gray-200 hover:border-[#3FC1C9] hover:shadow-md"
                        }`}
                    >
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-xl text-[#364F6B] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.desc}
                      </p>
                      {formData?.budget === item.title && (
                        <div className="mt-3">
                          <FaCheck className="text-[#FC5185] mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {errors.budget && (
                  <p className="text-red-500 text-sm mt-4 flex items-center gap-2 justify-center">
                    <AiOutlineExclamationCircle />
                    {errors.budget}
                  </p>
                )}
              </div>
            )}

            {/* Step 4: Travelers */}
            {currentStep === 4 && (
              <div className="text-center">
                <div className="text-6xl mb-6">👥</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#364F6B] mb-4">
                  Who's joining the adventure?
                </h2>
                <p className="text-gray-600 mb-8">
                  Tell us about your travel companions
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {SelectTravelesList.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleInputChange("traveler", item.people)}
                      className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${formData?.traveler === item.people
                        ? "border-[#FC5185] bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg"
                        : "border-gray-200 hover:border-[#3FC1C9] hover:shadow-md"
                        }`}
                    >
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-lg text-[#364F6B] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.desc}
                      </p>
                      {formData?.traveler === item.people && (
                        <div className="mt-3">
                          <FaCheck className="text-[#FC5185] mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {errors.traveler && (
                  <p className="text-red-500 text-sm mt-4 flex items-center gap-2 justify-center">
                    <AiOutlineExclamationCircle />
                    {errors.traveler}
                  </p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className={`px-6 py-3 rounded-full ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                  }`}
              >
                <FaArrowLeft className="mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] hover:from-[#FC5185] hover:to-[#3FC1C9] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Next
                  <FaArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={onGenerateTrip}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-[#3FC1C9] to-[#FC5185] hover:from-[#FC5185] hover:to-[#3FC1C9] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold"
                >
                  {loading ? (
                    <>
                      <Spinner />
                      <span className="ml-2">Generating...</span>
                    </>
                  ) : (
                    <>
                      ✨ Generate My Trip
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Trip Summary */}
            {currentStep === 4 && formData.location && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <h3 className="font-bold text-lg text-[#364F6B] mb-4 text-center">
                  🎯 Trip Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <FaMapMarkerAlt className="text-[#3FC1C9] mx-auto mb-2" />
                    <p className="font-medium text-gray-900">{formData.location?.label}</p>
                    <p className="text-sm text-gray-600">Destination</p>
                  </div>
                  <div>
                    <FaCalendarAlt className="text-[#3FC1C9] mx-auto mb-2" />
                    <p className="font-medium text-gray-900">{formData.noOfDays} Days</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                  <div>
                    <FaDollarSign className="text-[#3FC1C9] mx-auto mb-2" />
                    <p className="font-medium text-gray-900">{formData.budget}</p>
                    <p className="text-sm text-gray-600">Budget</p>
                  </div>
                  <div>
                    <FaUsers className="text-[#3FC1C9] mx-auto mb-2" />
                    <p className="font-medium text-gray-900">
                      {SelectTravelesList.find(t => t.people === formData.traveler)?.title}
                    </p>
                    <p className="text-sm text-gray-600">Travelers</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
              <div className="text-6xl mb-4 flex justify-between items-center">
                <img src="/rahi-logo.png" className="w-10 h-auto sm:w-12" alt="Logo" />
                <h1 className="font-bold text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185]">
                  RAHi
                </h1>
              </div>
              <h3 className="text-xl font-bold text-[#364F6B] mb-2">
                Creating Your Perfect Trip
              </h3>
              <p className="text-gray-600 mb-6">
                Our AI is analyzing thousands of options to create your personalized itinerary...
              </p>
              <Spinner />
              <div className="mt-4 text-sm text-gray-500">
                This usually takes 10-30 seconds
              </div>
            </div>
          </div>
        )}

        {/* Sign In Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogDescription>
                <div className="text-center">
                  <div className="flex items-center mb-6">
                    <img
                      src="/rahi-logo.png"
                      className="w-12 h-auto"
                      alt="RAHi Logo"
                    />
                    <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185] ml-2">
                      RAHi
                    </h1>
                  </div>

                  <h2 className="font-bold text-xl text-gray-900 mb-2">
                    Sign in to continue
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Sign in with Google to save and access your personalized trip plans
                  </p>

                  <Button
                    onClick={login}
                    className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <FcGoogle className="h-6 w-6" />
                    <span className="font-medium">Continue with Google</span>
                  </Button>

                  <p className="text-xs text-gray-500 mt-4">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
