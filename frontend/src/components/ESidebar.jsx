import React, { useEffect } from 'react'
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

import axios from 'axios';
import { useAuth } from '../context/authContext';
import {useNavigate } from 'react-router-dom'

const navigate = useNavigate()





const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "New Chat",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Library",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search Chats",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const ESidebar = () => {

const { chats, setChats, messages, loadAllChats, setCurrentchatId } = useAuth();
const newChat = ()=>{
  const res= axios.post('', {withCredentials:true});

if(res.success){
  navigate('/chat')
  
}

}
  


useEffect(()=>{
  loadAllChats()
},[messages])
  return (
    <Sidebar className='mt-15  h-[calc(100vh-60px)] '>
      <SidebarContent className='bg-gray-900'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-[15px] font-bold text-gray-300' >Garauda AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item._id}>
  <SidebarMenuButton asChild>
    <div
      onClick={() => {
        setCurrentchatId(item._id);
        console.log('hi')
        localStorage.setItem("chatid", item._id);
      }}
      className="text-gray-300 text-[14px] cursor-pointer"
    >
      {item.title}
    </div>
  </SidebarMenuButton>
</SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu className='mt-10 p-3'>
              <div>
                <div className='flex items-center p-2 '>
                  <span className='font-semibold text-white'>Your Chats</span>
                <IoMdArrowDropdown color='white'/>

                </div>
                
                {
                  chats?.map((item)=>(
                    <SidebarMenuItem key={item._id}>
                      <SidebarMenuButton asChild>
                        <span className='text-gray-300 text-[14px] '>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                  ))
                }
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default ESidebar