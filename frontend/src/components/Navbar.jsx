import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import logo from "../assets/LogoCrop.jpeg";
import logo2 from '../assets/CFinance.jpeg'
import logo3 from '../assets/CCreator.jpeg'
import {Button} from '@/components/ui/button'
import {Link} from 'react-router-dom'


import { IoGiftOutline } from "react-icons/io5";

import {useAuth} from '../context/authContext'
import { HdIcon } from "lucide-react";

const Navbar = () => {

 const [selectLogo,setLogo]=useState(logo);
 const{openLogin}=useAuth();
 const {isLoggedIn}=useAuth();




  return (
    <div className="fixed w-full border-b shadow-md">

    
    <div className="flex w-full h-[60px] p-2 justify-around bg-gray-800 items-center">
      {/* logo-section*/}
      <div className="">
        
         <DropdownMenu >
          <DropdownMenuTrigger className='hover:cursor-pointer hover:border-yellow-100  outline-none '>
             <img className="rounded-full" src={selectLogo} alt="logo" width={50} />
           
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-gray-600  border-none mt-5 ml-7'>
            <DropdownMenuLabel className='text-gray-300'>Choose Mode</DropdownMenuLabel>
            <DropdownMenuSeparator />


            <DropdownMenuItem className='hover:bg-gray-500' onClick={()=>setLogo(logo)}>  <img className="rounded-3xl" src={logo}
             alt="logo" width={35}  />
             
              <span className="text-[12px] font-semibold pl-1 text-zinc-300">Student</span></DropdownMenuItem>
            
            
            
            <DropdownMenuItem className='hover:bg-gray-500' onClick={()=>setLogo(logo2)}>
                 <img className="rounded-3xl" src={logo2}
             alt="logo" width={35} />
                <span className="pl-1 text-[12px] font-semibold text-zinc-300">Finance</span></DropdownMenuItem>
            
            
            
            <DropdownMenuItem className='hover:bg-gray-500' onClick={()=>setLogo(logo3)}>
                 <img className="rounded-3xl" src={logo3}
             alt="logo" width={35} />
                <span className="font-semibold text-[12px] pl-1 text-zinc-300">Creator</span></DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
        
        
              </div>

      {/* center-section */}
      <div className="flex justify-between items-center   md:gap-4 md:w-[300px]">

        <li className="list-none ">
          <Link to='/'
          className=" text-[12px]  md:text-sm font-medium text-slate-200
    px-3 py-2 rounded-md
    transition-all duration-200 ease-out
    hover:text-white hover:bg-white/10 "
          >Dashboard</Link>
          
        </li>
        <li className=" list-none ">
          <Link 
            className="  text-[12px]  md:text-sm font-medium text-slate-200
    px-3 py-2 rounded-md
    transition-all duration-200 ease-out
    hover:text-white hover:bg-white/10 "
          to='/about'>About</Link>
          
        </li>
        <li className="list-none" >
          <Link
            className=" text-[12px]  md:text-sm font-medium text-slate-200
    px-3 py-2 rounded-md
    transition-all duration-200 ease-out
    hover:text-white hover:bg-white/10"
          to='/support'>Support</Link>
          
        </li>


      </div>

      {/* profile-section */}
      <div className="flex md:gap-3 items-center">
        <DropdownMenu >
          <DropdownMenuTrigger className='outline-none'>
            <Avatar className={isLoggedIn ? 'block mr-1 bg-zinc-800' : 'hidden'} >
  <AvatarImage  />
  <AvatarFallback >{userName}</AvatarFallback>
</Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='mr-1 bg-gray-600  border-none mt-5'>
            <DropdownMenuLabel className='text-gray-300'>Profile</DropdownMenuLabel>
           
            <DropdownMenuSeparator />

            
            <DropdownMenuItem className='hover:bg-gray-500'>  <img className="rounded-3xl" src={logo}
             alt="logo" width={35}  />
             
              <span className="text-[12px] font-semibold pl-1 text-zinc-300">Student</span></DropdownMenuItem>
            
            
            
            <DropdownMenuItem className='hover:bg-gray-500'>
                 <img className="rounded-3xl" src={logo}
             alt="logo" width={35} />
                <span className="pl-1 text-[12px] font-semibold text-zinc-300">Finance</span></DropdownMenuItem>
            
            
            
            <DropdownMenuItem className='hover:bg-gray-500'>
                 <img className="rounded-3xl" src={logo}
             alt="logo" width={35} />
                <span className="font-semibold text-[12px] pl-1 text-zinc-300">Creator</span></DropdownMenuItem>
           
           
          </DropdownMenuContent>
        </DropdownMenu>
        <IoGiftOutline className={isLoggedIn ? 'block' : 'hidden'} size={25} color='yellow'/>


        <Button className='bg-purple-400 ml-1 text-white h-[30px] w-[50px] ' onClick={openLogin}>Login</Button>
  
      </div>
    </div>
    </div>
  );
};

export default Navbar;
