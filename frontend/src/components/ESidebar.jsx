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
import { useNavigate ,Link} from 'react-router-dom';
import { useSidebar } from './ui/sidebar';
import Setting from './Setting.jsx'









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
  const navigate=useNavigate();
 

const { chats, setChats, messages, loadAllChats, setCurrentchatId , openSetting,setOpenSetting } = useAuth();

const {setOpen,isMobile}=useSidebar()

const newChat= async()=>{
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/newchat`,{} , {withCredentials:true});
  if(res.data.success){
    console.log('newchat');
    console.log(res.data.chatId);
    localStorage.setItem('chatid',res.data.chatId)
    
    
    
     setCurrentchatId(res.data.chatId)
     navigate('chat')
  }
  else{
    return;
  }


}



const handleClick=(item,e)=>{
 
  console.log(item);
  
  
 switch(item){
       case "New Chat": 
                 newChat();
                break;
      case 'Settings' :
        setOpenSetting(true)
        break;

        default: return;
        
        

       
 }

}
const chatLoad=(id)=>{
  console.log('chatid',id)
  setCurrentchatId(id)
  navigate('chat');
  if(isMobile){
          setOpen(false)
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
                <SidebarMenuItem key= {item.title} >
  <SidebarMenuButton asChild>
    <div
      onClick={()=>handleClick(item.title)}
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
                    <SidebarMenuItem key={item?._id}>
                      <SidebarMenuButton asChild
                      onClick={()=>chatLoad(item?._id)}
                      
                      >
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
      {openSetting && <Setting close={()=>setOpenSetting(false)}/>}
    </Sidebar>
  )
}

export default ESidebar