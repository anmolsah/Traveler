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
import { useNavigate } from "react-router-dom";
import Spinner from "@/constants/Spinner";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

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
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value < 0) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
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

    if (
      (formData?.noOfDays > 8 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      //console.log("You can not select more than 8 days");
      showErrorToast("Please fill all the details");
      return;
    }
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
    //console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, // Fixed the typo here
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
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-[#364F6B]">
        Tell us your travel preferences ✈️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185]">
          RAHi
        </span>{" "}
        will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            Destination you want to travel?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium text-[#364F6B]">
            How many days you want to stay?
          </h2>
          <Input
            placeholder={"Ex. 3 Days"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            className="border border-[#3FC1C9] focus:border-[#FC5185] focus:ring-[#FC5185] rounded-lg"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium text-[#364F6B]">
          What is Your Budget?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-[#F5F5F5] hover:border-[#FC5185]
                ${
                  formData?.budget === item.title &&
                  "shadow-lg border-[#FC5185]"
                }`}
            >
              <h2 className="text-4xl text-[#364F6B]">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#364F6B]">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium text-[#364F6B]">
          Who will you be traveling with on your adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer bg-[#F5F5F5] hover:border-[#FC5185]
                ${
                  formData?.traveler === item.people &&
                  "shadow-lg border-[#FC5185]"
                }`}
            >
              <h2 className="text-4xl text-[#364F6B]">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#364F6B]">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}
          className="p-6 text-lg bg-[#3FC1C9] hover:bg-[#FC5185] text-white"
        >
          {loading ? (
            // <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            <Spinner />
          ) : (
            " Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/rahi.png" className="w-32 h-auto m-auto" />
              <h2 className="font-bold text-lg mt-7 text-[#364F6B]">
                Sign In With Google
              </h2>
              <p className="text-gray-500">
                Sign in to Rahi with Google authentication securely!
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center bg-[#3FC1C9] hover:bg-[#FC5185] text-white"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
