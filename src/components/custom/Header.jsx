import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import "../../App.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {});

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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile information:", error);
      });
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5">
      <a href="/" className="flex items-center gap-2">
        <img src="/rahi-logo.png" className="w-10 h-auto sm:w-12" alt="Logo" />
        <h1 className="font-bold text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185]">
          RAHi
        </h1>
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-[#3FC1C9] bg-[#FC5185]"
              >
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-white hover:bg-gray-700 transition-colors duration-200"
              >
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] rounded-full"
                  alt="User"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center justify-center gap-2 mb-5">
                <img src="/rahi-logo.png" className="w-10 h-auto sm:w-12" alt="Logo" />
                <h1 className="font-bold text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#364F6B] to-[#FC5185]">
                  RAHi
                </h1>
              </div>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to Rahi with Google authentication securely!</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
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

export default Header;
