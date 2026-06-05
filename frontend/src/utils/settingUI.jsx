import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoColorFill } from "react-icons/io5";

import Toggle from "../components/ui/toggle";

import { useSetting } from "../context/settingContext";

const General = () => {
  const { generalSetting, setGeneralSettings, colorData } = useSetting();

  return (
    <div className="w-full p-5">
      <div className="border-b-1 pb-3 pt-2">
        <span>General</span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between border-b-1 mt-3 pb-2 border-zinc-600">
          <span className="font-extralight max-[500px]:text-[13px]">
            Appearance
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none font-light border-none hover:bg-zinc-700 max-[500px]:text-[13px]"
              >
                {generalSetting?.theme} <RiArrowDropDownLine size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-700 border-none">
              <DropdownMenuGroup className="text-white font-light ">
                <DropdownMenuItem
                  className="hover:bg-zinc-900"
                  onClick={() =>
                    setGeneralSettings((prev) => ({ ...prev, theme: "System" }))
                  }
                >
                  System
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-zinc-900"
                  onClick={() =>
                    setGeneralSettings((prev) => ({ ...prev, theme: "Dark" }))
                  }
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-zinc-900"
                  onClick={() =>
                    setGeneralSettings((prev) => ({ ...prev, theme: "Light" }))
                  }
                >
                  Light
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between border-b mt-5 pb-2 border-zinc-600 ">
          <span className="font-extralight max-[500px]:text-[13px]">
            Contrast
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none font-light border-none hover:bg-zinc-700 max-[500px]:text-[13px]"
              >
                {generalSetting?.contrast} <RiArrowDropDownLine size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-700 border-none">
              <DropdownMenuGroup className="text-white font-light ">
                <DropdownMenuItem
                  className="hover:bg-zinc-900"
                  onClick={() =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      contrast: "System",
                    }))
                  }
                >
                  System
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-zinc-900"
                  onClick={() =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      contrast: "Medium",
                    }))
                  }
                >
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-zinc-900"
                  onClick={() =>
                    setGeneralSettings((prev) => ({
                      ...prev,
                      contrast: "High",
                    }))
                  }
                >
                  High
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between border-b mt-5 pb-2 border-zinc-600">
          <span className="font-extralight max-[500px]:text-[13px]">
            Accent Color
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none font-light border-none hover:bg-zinc-700 max-[500px]:text-[13px]"
              >
                <span
                  className={`w-2 h-2 rounded-full ${generalSetting?.accColor?.value}`}
                ></span>
                {generalSetting?.accColor?.name} <RiArrowDropDownLine size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-700 border-none">
              <DropdownMenuGroup className="text-white font-light ">
                {/* <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColoraccColor('System')}>

                <span className="w-2 h-2 rounded-full bg-zinc-500"></span>Default</DropdownMenuItem>

              <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('green')}>

                <span className="w-2 h-2 rounded-full bg-green-500"></span>green</DropdownMenuItem>

               <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('yellow')}>

                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>yellow</DropdownMenuItem>


                 <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('pink')}>

                <span className="w-2 h-2 rounded-full bg-pink-500"></span>pink</DropdownMenuItem>

                 <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('purple')}>

                <span className="w-2 h-2 rounded-full bg-purple-500"></span>purple</DropdownMenuItem> */}
                {colorData.map((item) => (
                  <DropdownMenuItem
                    className="hover:bg-zinc-900"
                    onClick={() =>
                      setGeneralSettings((prev) => ({ ...prev, accColor: item }))
                    }
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${item?.value}`}
                    ></span>
                    {item?.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

const Notification = () => {
  const { notification, setNotification } = useSetting();

  return (
    <div className="w-full p-5">
      <div className="border-b-1 pb-3 pt-2">
        <span>General</span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between border-b-1 mt-3 pb-2 border-zinc-600">
          <span className="font-extralight max-[500px]:text-[13px]">
            Responses
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none font-light border-none hover:bg-zinc-700 max-[500px]:text-[13px]"
              >
                {notification?.push ? "Push" : "Off"}
                <RiArrowDropDownLine size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-700 border-none">
              <DropdownMenuGroup className="text-white font-light ">
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <Toggle
                    checked={notification?.push}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, push: val }))
                    }
                  />
                  Push
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between border-b-1 mt-3 pb-2 border-zinc-600">
          <span className="font-extralight max-[500px]:text-[13px]">
            Group Chats
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none font-light border-none hover:bg-zinc-700 max-[500px]:text-[13px]"
              >
                {notification?.email ? "Email" : "Off"}
                <RiArrowDropDownLine size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-700 border-none">
              <DropdownMenuGroup className="text-white font-light ">
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <Toggle
                    checked={notification?.email}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, email: val }))
                    }
                  />
                  {notification?.email ? "Email" : "Off"}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between border-b-1 mt-3 pb-2 border-zinc-600">
          <span className="font-extralight max-[500px]:text-[13px]">Usage</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none font-light border-none hover:bg-zinc-700 max-[500px]:text-[13px] flex "
              >
                {notification?.u_push ? "Push " : "Off "},
                {notification?.u_email ? " Email" : " Off"}
                <RiArrowDropDownLine size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-700 border-none">
              <DropdownMenuGroup className="text-white font-light ">
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <Toggle
                    checked={notification?.u_push}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, u_push: val }))
                    }
                  />
                  Push
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <Toggle
                    checked={notification?.u_email}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, u_email: val }))
                    }
                  />
                  Email
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

const Personalization = () => {
  return (
    <div className="w-full p-5">
      <div className="border-b-1 pb-3 pt-2">
        <span>Personalization</span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between mt-3 pb-2 border-zinc-600">
          <div className="flex flex-col gap-1">
            <span className="font-extralight max-[500px]:text-[13px]">
              Basic style and tone
            </span>
            <p className="font-thin text-[11px]">
              Set the style and tone of how ChatGPT responds to you. This
              <br></br>doesn't impact ChatGPT's capabilities. Default
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-none font-light border-none hover:bg-zinc-700 max-[500px]:text-[13px]"
              >
                <RiArrowDropDownLine size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-700 border-none">
              <DropdownMenuGroup className="text-white font-light ">
                <DropdownMenuItem className="hover:bg-zinc-900">
                  System
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <div className="flex flex-col">
                     Professional<span className="font-thin text-[11px]">Polished and precise</span>

                  </div>
                  
                 
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900">
                  
                  <div className="flex flex-col">
                     Candid<span className="font-thin text-[11px]">Direct and encouraging</span>

                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <div className="flex flex-col">
                     Quirky<span className="font-thin text-[11px]">Playful and imaginative</span>

                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900">
                <div className="flex flex-col">
                     Efficient<span className="font-thin text-[11px]">Concise and plain</span>

                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900">
                 <div className="flex flex-col">
                     Cynical<span className="font-thin text-[11px]">Critical and sarcastic</span>

                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
const DataControl = () => {
  return (
    <div className="w-full p-5">
      <div className="border-b pb-3 pt-2">
        <span>Data Controls</span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">Chat History</span>
            <p className="text-[11px] font-thin">
              Save conversations for future reference
            </p>
          </div>

          <Toggle />
        </div>

        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">Training Data</span>
            <p className="text-[11px] font-thin">
              Allow conversations to improve the platform
            </p>
          </div>

          <Toggle />
        </div>

        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">Export Data</span>
            <p className="text-[11px] font-thin">
              Download a copy of your account data
            </p>
          </div>

          <Button variant="outline">Export</Button>
        </div>
      </div>
    </div>
  );
};
const Security = () => {
  return (
    <div className="w-full p-5">
      <div className="border-b pb-3 pt-2">
        <span>Security</span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">Change Password</span>
            <p className="text-[11px] font-thin">
              Update your account password
            </p>
          </div>

          <Button variant="outline">Change</Button>
        </div>

        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">
              Two-Factor Authentication
            </span>
            <p className="text-[11px] font-thin">
              Add extra protection to your account
            </p>
          </div>

          <Toggle />
        </div>

        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">Active Sessions</span>
            <p className="text-[11px] font-thin">
              Manage logged-in devices
            </p>
          </div>

          <Button variant="outline">View</Button>
        </div>
      </div>
    </div>
  );
};


const Account = () => {
  return (
    <div className="w-full p-5">
      <div className="border-b pb-3 pt-2">
        <span>Account</span>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">Email Address</span>
            <p className="text-[11px] font-thin">
              user@example.com
            </p>
          </div>

          <Button variant="outline">Edit</Button>
        </div>

        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight">Phone Number</span>
            <p className="text-[11px] font-thin">
              Add a recovery phone number
            </p>
          </div>

          <Button variant="outline">Add</Button>
        </div>

        <div className="flex items-center justify-between border-b mt-3 pb-2 border-zinc-600">
          <div>
            <span className="font-extralight text-red-400">
              Delete Account
            </span>
            <p className="text-[11px] font-thin">
              Permanently delete your account
            </p>
          </div>

          <Button variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export {
  General,
  Notification,
  DataControl,
  Personalization,
  Security,
  Account,
};
