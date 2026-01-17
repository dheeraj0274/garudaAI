import React from 'react'
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
  return (
    <Sidebar className='mt-15  h-[calc(100vh-60px)] '>
      <SidebarContent className='bg-gray-900'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-[15px] font-bold text-gray-300' >Garauda AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className='text-white text-[15px] '>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu className='mt-10 p-3'>
              <div>
                <span className='font-semibold text-white'>Your Chats</span>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default ESidebar