

import React, { useEffect, useState, useRef } from 'react'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IoMdArrowDropdown } from "react-icons/io";
import { MoreHorizontal, Trash2, Archive } from "lucide-react";

import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { useSidebar } from './ui/sidebar';
import Setting from './Setting.jsx'

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "New Chat", url: "#", icon: Inbox },
  { title: "Library", url: "#", icon: Calendar },
  { title: "Search Chats", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
]


const ChatItem = ({ item, onChatLoad }) => {
  const [hoveredChat, setHoveredChat] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
const {loadAllChats}=useAuth()
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    //delte
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/chat/delete/${item._id}`  ,{ withCredentials:true})
      console.log(res.data)
      loadAllChats()
    } catch (error) {
      console.log(error)
      
    }
    console.log('Delete chat:', item._id);
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    // archeive
    console.log('Archive chat:', item._id);
  };

  return (
    <SidebarMenuItem
      key={item?._id}
      onMouseEnter={() => setHoveredChat(true)}
      onMouseLeave={() => { if (!menuOpen) setHoveredChat(false); }}
      className="relative"
    >
      <div className="flex items-center justify-between w-full group hover:bg-zinc-700 rounded-xl p-1">
        <SidebarMenuButton
          asChild
          onClick={() => onChatLoad(item?._id)}
          className="flex-1 min-w-0 "
        >
          <span className="text-gray-300 text-[14px]  cursor-pointer truncate pr-6">
            {item.title}
          </span>
        </SidebarMenuButton>

        {/* Three-dot button — visible on hover or when menu is open */}
        {(hoveredChat || menuOpen) && (
          <div className="relative flex-shrink-0" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
              className="p-1 rounded hover:bg-zinc-600 text-gray-400 hover:text-white transition-colors"
              title="More options"
            >
              <MoreHorizontal size={15} />
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 top-7 z-50 w-36 bg-zinc-700 border border-zinc-600 rounded-md shadow-lg py-1">
                <button
                  onClick={handleDelete}
                  className="cursur-pointer flex items-center gap-2 w-full px-3 py-2 text-[13px] text-red-400 hover:bg-zinc-600 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
                <button
                  onClick={handleArchive}
                  className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-300 hover:bg-zinc-600 hover:text-white transition-colors"
                >
                  <Archive size={14} />
                  Archive
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </SidebarMenuItem>
  );
};

const ESidebar = () => {
  const navigate = useNavigate();
  const { chats, setChats, messages, loadAllChats, setCurrentchatId, openSetting, setOpenSetting, setLoading } = useAuth();
  const { setOpen, isMobile } = useSidebar();

  const newChat = async () => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/newchat`, {}, { withCredentials: true });
    if (res.data.success) {
      localStorage.setItem('chatid', res.data.chatId);
      setCurrentchatId(res.data.chatId);
      navigate('chat');
    }
  };

  const handleClick = (item) => {
    switch (item) {
      case "New Chat":
        newChat();
        break;
      case 'Settings':
        setOpenSetting(true);
        break;
      default:
        return;
    }
  };

  const chatLoad = (id) => {
    setCurrentchatId(id);
    navigate('chat');
    if (isMobile) setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      loadAllChats();
    } else {
      setLoading(false);
    }
  }, [messages]);

  return (
    <Sidebar className='mt-15 h-[calc(100vh-60px)]'>
      <SidebarContent className='bg-zinc-800'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-[15px] font-bold text-gray-300'>Garauda AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} c>
                  <SidebarMenuButton asChild>
                    <div
                      onClick={() => handleClick(item.title)}
                      className="text-gray-300 text-[14px] cursor-pointer hover:bg-zinc-700"
                    >
                      {item.title}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <SidebarMenu className='mt-10 p-3'>
              <div>
                <div className='flex items-center p-2'>
                  <span className='font-semibold text-white'>Your Chats</span>
                  <IoMdArrowDropdown color='white' />
                </div>

                {chats?.map((item) => (
                  <ChatItem key={item?._id} item={item} onChatLoad={chatLoad} />
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {openSetting && <Setting close={() => setOpenSetting(false)} />}
    </Sidebar>
  );
};

export default ESidebar;