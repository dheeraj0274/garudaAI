import { IoClose } from "react-icons/io5";
import { Button } from "../components/ui/button";

import {
  IoIosSettings,
  IoIosNotificationsOutline,
  IoMdAddCircleOutline,
} from "react-icons/io";
import { BsDatabaseFillGear } from "react-icons/bs";
import { FaFaceGrin } from "react-icons/fa6";
import { IoKey } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  General,
  Notification,
  DataControl,
  Personalization,
  Security,
  Account,
} from "../utils/settingUI.jsx";
import { useState } from "react";

const setting_icons = [
  {
    title: "General",
    icon: <IoIosSettings size={16} />,
  },
  {
    title: "Notification",
    icon: <IoNotificationsSharp size={16} />,
  },
  {
    title: "Personalization",
    icon: <FaFaceGrin size={16} />,
  },
  {
    title: "Data Control",
    icon: <BsDatabaseFillGear size={16} />,
  },
  {
    title: "Security",
    icon: <IoKey size={16} />,
  },
  {
    title: "Account",
    icon: <IoMdAddCircleOutline size={16} />,
  },
];

const Settings = ({ close }) => {
  const [activeTab, setActiveTab] = useState("General");

  const handleClick = (e) => {
    setActiveTab(e);
  };

  console.log(activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "General":
        return <General />;
        break;
      case "Notification":
        return <Notification />;
        break;
      case "Personalization":
        return <Personalization />;
        break;
      case "Data Control":
        return <DataControl />;
        break;
      case "Security":
        return <Security />;
        break;
      case "Account":
        return <Account />;
        break;

      default:
        <General />;
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={close}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="text-white w-full max-w-3xl md:h-[65%] h-[70%] rounded-2xl relative shadow-2xl shadow-black/60 ring-1 ring-white/10 overflow-hidden">
          <div className="flex w-full h-full">
            {/* left-setting-container */}
            <div className="bg-zinc-950 w-[34%] md:w-[30%] p-3 md:p-4 flex flex-col border-r border-zinc-800">
              <div className="flex justify-end">
                <div className="hover:bg-zinc-800 cursor-pointer rounded-md p-1.5 transition-colors">
                  <IoClose onClick={close} size={18} />
                </div>
              </div>

              {/* sidebar */}
              <div className="flex flex-col gap-1 md:mt-8 mt-4">
                {setting_icons.map((item) => {
                  const isActive = activeTab === item?.title;
                  return (
                    <div
                      key={item?.title}
                      onClick={() => handleClick(item?.title)}
                      className={`flex items-center gap-2 pl-2 md:p-2.5 p-2 rounded-lg cursor-pointer transition-colors
                        ${
                          isActive
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                        }`}
                    >
                      <span className={isActive ? "text-lime-400" : ""}>
                        {item?.icon}
                      </span>
                      <span className="max-[550px]:text-[10px] max-[760px]:font-light md:text-[13px] truncate">
                        {item?.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* right setting container */}
            <div className="bg-zinc-900 w-[66%] md:w-[70%] overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;