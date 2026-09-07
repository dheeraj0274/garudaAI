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

/* ---------- Shared presentational helpers (no logic, styling only) ---------- */

const SectionHeader = ({ title }) => (
  <div className="border-b border-zinc-700 pb-3 pt-2 mb-4">
    <span className="text-lg font-semibold text-zinc-100 tracking-tight">
      {title}
    </span>
  </div>
);

const SettingRow = ({ label, description, children }) => (
  <div className="flex items-center justify-between gap-4 border-b border-zinc-800 py-4 first:pt-0 last:border-b-0">
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="font-medium text-zinc-200 max-[500px]:text-[13px]">
        {label}
      </span>
      {description && (
        <p className="text-[12px] font-normal text-zinc-500 leading-snug">
          {description}
        </p>
      )}
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const dropdownTriggerClass =
  "outline-none font-normal border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 hover:border-zinc-600 text-zinc-200 rounded-lg px-3 transition-colors max-[500px]:text-[13px]";

const dropdownContentClass =
  "bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl shadow-black/40 p-1";

const dropdownItemClass =
  "rounded-lg cursor-pointer hover:bg-zinc-700/80 focus:bg-zinc-700/80 transition-colors flex items-center gap-2 px-2 py-2";

/* ---------------------------------------------------------------------- */

const General = () => {
  const { generalSetting, setGeneralSettings, colorData } = useSetting();

  return (
    <div className="w-full p-5">
      <SectionHeader title="General" />

      <div className="flex flex-col">
        <SettingRow label="Appearance">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={dropdownTriggerClass}>
                {generalSetting?.theme}
                <RiArrowDropDownLine size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownContentClass}>
              <DropdownMenuGroup className="text-zinc-200 font-normal">
                <DropdownMenuItem
                  className={dropdownItemClass}
                  onClick={() =>
                    setGeneralSettings((prev) => ({ ...prev, theme: "System" }))
                  }
                >
                  System
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={dropdownItemClass}
                  onClick={() =>
                    setGeneralSettings((prev) => ({ ...prev, theme: "Dark" }))
                  }
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={dropdownItemClass}
                  onClick={() =>
                    setGeneralSettings((prev) => ({ ...prev, theme: "Light" }))
                  }
                >
                  Light
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SettingRow>

        <SettingRow label="Contrast">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={dropdownTriggerClass}>
                {generalSetting?.contrast}
                <RiArrowDropDownLine size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownContentClass}>
              <DropdownMenuGroup className="text-zinc-200 font-normal">
                <DropdownMenuItem
                  className={dropdownItemClass}
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
                  className={dropdownItemClass}
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
                  className={dropdownItemClass}
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
        </SettingRow>

        <SettingRow label="Accent Color">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${dropdownTriggerClass} flex items-center gap-2`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ring-1 ring-white/20 ${generalSetting?.accColor?.value}`}
                ></span>
                {generalSetting?.accColor?.name}
                <RiArrowDropDownLine size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownContentClass}>
              <DropdownMenuGroup className="text-zinc-200 font-normal">
                {colorData.map((item, idx) => (
                  <DropdownMenuItem
                    key={idx}
                    className={dropdownItemClass}
                    onClick={() =>
                      setGeneralSettings((prev) => ({ ...prev, accColor: item }))
                    }
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ring-1 ring-white/20 ${item?.value}`}
                    ></span>
                    {item?.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SettingRow>
      </div>
    </div>
  );
};

const Notification = () => {
  const { notification, setNotification } = useSetting();

  return (
    <div className="w-full p-5">
      <SectionHeader title="Notifications" />

      <div className="flex flex-col">
        <SettingRow label="Responses">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={dropdownTriggerClass}>
                {notification?.push ? "Push" : "Off"}
                <RiArrowDropDownLine size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownContentClass}>
              <DropdownMenuGroup className="text-zinc-200 font-normal">
                <DropdownMenuItem className={dropdownItemClass}>
                  <Toggle
                    checked={notification?.push}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, push: val }))
                    }
                  />
                  <span>Push</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SettingRow>

        <SettingRow label="Group Chats">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={dropdownTriggerClass}>
                {notification?.email ? "Email" : "Off"}
                <RiArrowDropDownLine size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownContentClass}>
              <DropdownMenuGroup className="text-zinc-200 font-normal">
                <DropdownMenuItem className={dropdownItemClass}>
                  <Toggle
                    checked={notification?.email}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, email: val }))
                    }
                  />
                  <span>{notification?.email ? "Email" : "Off"}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SettingRow>

        <SettingRow label="Usage">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${dropdownTriggerClass} flex items-center gap-1`}
              >
                <span>{notification?.u_push ? "Push" : "Off"},</span>
                <span>{notification?.u_email ? "Email" : "Off"}</span>
                <RiArrowDropDownLine size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownContentClass}>
              <DropdownMenuGroup className="text-zinc-200 font-normal">
                <DropdownMenuItem className={dropdownItemClass}>
                  <Toggle
                    checked={notification?.u_push}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, u_push: val }))
                    }
                  />
                  <span>Push</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass}>
                  <Toggle
                    checked={notification?.u_email}
                    onChange={(val) =>
                      setNotification((prev) => ({ ...prev, u_email: val }))
                    }
                  />
                  <span>Email</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SettingRow>
      </div>
    </div>
  );
};

const Personalization = () => {
  return (
    <div className="w-full p-5">
      <SectionHeader title="Personalization" />

      <div className="flex flex-col">
        <SettingRow
          label="Basic style and tone"
          description={
            <>
              Set the style and tone of how ChatGPT responds to you. This
              <br />
              doesn't impact ChatGPT's capabilities. Default
            </>
          }
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={dropdownTriggerClass}>
                <RiArrowDropDownLine size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={dropdownContentClass}>
              <DropdownMenuGroup className="text-zinc-200 font-normal">
                <DropdownMenuItem className={dropdownItemClass}>
                  System
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass}>
                  <div className="flex flex-col">
                    <span>Professional</span>
                    <span className="font-normal text-[11px] text-zinc-500">
                      Polished and precise
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass}>
                  <div className="flex flex-col">
                    <span>Candid</span>
                    <span className="font-normal text-[11px] text-zinc-500">
                      Direct and encouraging
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass}>
                  <div className="flex flex-col">
                    <span>Quirky</span>
                    <span className="font-normal text-[11px] text-zinc-500">
                      Playful and imaginative
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass}>
                  <div className="flex flex-col">
                    <span>Efficient</span>
                    <span className="font-normal text-[11px] text-zinc-500">
                      Concise and plain
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className={dropdownItemClass}>
                  <div className="flex flex-col">
                    <span>Cynical</span>
                    <span className="font-normal text-[11px] text-zinc-500">
                      Critical and sarcastic
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SettingRow>
      </div>
    </div>
  );
};

const DataControl = () => {
  return (
    <div className="w-full p-5">
      <SectionHeader title="Data Controls" />

      <div className="flex flex-col">
        <SettingRow
          label="Chat History"
          description="Save conversations for future reference"
        >
          <Toggle />
        </SettingRow>

        <SettingRow
          label="Training Data"
          description="Allow conversations to improve the platform"
        >
          <Toggle />
        </SettingRow>

        <SettingRow
          label="Export Data"
          description="Download a copy of your account data"
        >
          <Button
            variant="outline"
            className="border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-200 rounded-lg"
          >
            Export
          </Button>
        </SettingRow>
      </div>
    </div>
  );
};

const Security = () => {
  return (
    <div className="w-full p-5">
      <SectionHeader title="Security" />

      <div className="flex flex-col">
        <SettingRow
          label="Change Password"
          description="Update your account password"
        >
          <Button
            variant="outline"
            className="border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-200 rounded-lg"
          >
            Change
          </Button>
        </SettingRow>

        <SettingRow
          label="Two-Factor Authentication"
          description="Add extra protection to your account"
        >
          <Toggle />
        </SettingRow>

        <SettingRow
          label="Active Sessions"
          description="Manage logged-in devices"
        >
          <Button
            variant="outline"
            className="border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-200 rounded-lg"
          >
            View
          </Button>
        </SettingRow>
      </div>
    </div>
  );
};

const Account = () => {
  return (
    <div className="w-full p-5">
      <SectionHeader title="Account" />

      <div className="flex flex-col">
        <SettingRow label="Email Address" description="user@example.com">
          <Button
            variant="outline"
            className="border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-200 rounded-lg"
          >
            Edit
          </Button>
        </SettingRow>

        <SettingRow
          label="Phone Number"
          description="Add a recovery phone number"
        >
          <Button
            variant="outline"
            className="border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-200 rounded-lg"
          >
            Add
          </Button>
        </SettingRow>

        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 py-4 last:border-b-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-medium text-red-400 max-[500px]:text-[13px]">
              Delete Account
            </span>
            <p className="text-[12px] font-normal text-zinc-500 leading-snug">
              Permanently delete your account
            </p>
          </div>

          <Button variant="destructive" className="rounded-lg shrink-0">
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