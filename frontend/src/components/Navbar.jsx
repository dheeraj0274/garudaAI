// import React, { useState } from "react";
// import { User, Mail, ShieldCheck, LogOut } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import logo from "../assets/LogoCrop.jpeg";
// import logo2 from '../assets/CFinance.jpeg'
// import logo3 from '../assets/CCreator.jpeg'
// import {Button} from '@/components/ui/button'
// import {Link} from 'react-router-dom'


// import { IoGiftOutline } from "react-icons/io5";

// import {useAuth} from '../context/authContext'
// import axios from "axios";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   console.log('rerender')

//  const [selectLogo,setLogo]=useState(logo);
//  const{openLogin}=useAuth();
//  const {isLoggedIn , setLoggedIn,setUserDetails, userDetails ,loadAllChats}=useAuth();

// const initials = userDetails?.name
//   ?.split(' ')
//   ?.slice(0, 2)
//   ?.reduce((acc, word) => acc + word[0], '')
//   ?.toUpperCase() || '';

//   const logout = async()=>{
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout` , {withCredentials:true});
//       if(res.data.success){
//         localStorage.removeItem('loggedIn')
//         toast.error('Logged-out')
//             setUserDetails(null);
//             setLoggedIn(false);
           
//             loadAllChats();
            
            
            
//       }
//     } catch (error) {
//       toast.error(error.message)
      
//     }
//   }

// const modeColors = {
//   student: "",
//   creator: "bg-red-800",
//   finance: "bg-sky-900",
// };

// const [mode, setMode] = useState("student");

// const changemode=(mode)=>{
//   setMode(mode)
// toast.success(` ${mode} mode`)
// }


 

// console.log(modeColors[mode])


//   return (
//     <div className="fixed w-full border-b shadow-md">

    
//     <div className={` ${modeColors[mode]} flex w-full h-[60px] p-2 justify-around  items-center bg-gray-900` }>
//       {/* logo-section*/}
//       <div className="">
        
//          <DropdownMenu >
//           <DropdownMenuTrigger className='hover:cursor-pointer hover:border-yellow-100  outline-none '>
//              <img className="rounded-full" src={selectLogo} alt="logo" width={50} />
           
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className='bg-gray-600  border-none mt-5 ml-7'>
//             <DropdownMenuLabel className='text-gray-300'>Choose Mode</DropdownMenuLabel>
//             <DropdownMenuSeparator />


//             <DropdownMenuItem className='hover:bg-gray-500'
//              onClick={()=>{setLogo(logo) ; changemode("student")}}>  <img className="rounded-3xl" src={logo}
//              alt="logo" width={35}  />
             
//               <span className="text-[12px] font-semibold pl-1 text-zinc-300">Student</span></DropdownMenuItem>
            
            
            
//             <DropdownMenuItem className='hover:bg-gray-500' onClick={()=>{setLogo(logo2) ; changemode("finance")}}>
//                  <img className="rounded-3xl" src={logo2}
//              alt="logo" width={35} />
//                 <span className="pl-1 text-[12px] font-semibold text-zinc-300">Finance</span></DropdownMenuItem>
            
            
            
//             <DropdownMenuItem className='hover:bg-gray-500' onClick={()=>{setLogo(logo3) ; changemode("creator")}}>
//                  <img className="rounded-3xl" src={logo3}
//              alt="logo" width={35} />
//                 <span className="font-semibold text-[12px] pl-1 text-zinc-300">Creator</span></DropdownMenuItem>
           
//           </DropdownMenuContent>
//         </DropdownMenu>
        
        
//               </div>

//       {/* center-section */}
//       <div className="flex justify-between items-center   md:gap-4 md:w-[300px]">

//         <li className="list-none ">
//           <Link to='/'
//           className=" text-[12px]  md:text-sm font-medium text-slate-200
//     px-3 py-2 rounded-md
//     transition-all duration-200 ease-out
//     hover:text-white hover:bg-white/10 "
//           >Dashboard</Link>
          
//         </li>
//         <li className=" list-none ">
//           <Link 
//             className="  text-[12px]  md:text-sm font-medium text-slate-200
//     px-3 py-2 rounded-md
//     transition-all duration-200 ease-out
//     hover:text-white hover:bg-white/10 "
//           to='/about'>About</Link>
          
//         </li>
//         <li className="list-none" >
//           <Link
//             className=" text-[12px]  md:text-sm font-medium text-slate-200
//     px-3 py-2 rounded-md
//     transition-all duration-200 ease-out
//     hover:text-white hover:bg-white/10"
//           to='/support'>Support</Link>
          
//         </li>


//       </div>
//       {/* profile-section */}
// <div className="flex md:gap-3 items-center">
//   <DropdownMenu>
//     <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-full transition-shadow">
//       <Avatar
//         className={
//           isLoggedIn
//             ? 'block mr-1 bg-zinc-800 ring-2 ring-zinc-700 hover:ring-orange-400 transition-all duration-200 cursor-pointer'
//             : 'hidden'
//         }
//       >
//         <AvatarImage />
//         <AvatarFallback className="text-white font-medium">
//           {initials}
//         </AvatarFallback>
//       </Avatar>
//     </DropdownMenuTrigger>

//     <DropdownMenuContent className="mr-1 mt-3 w-64 bg-zinc-800 border border-zinc-700 shadow-xl rounded-xl p-1.5">
//       <DropdownMenuLabel className="text-zinc-100 font-semibold px-2 py-2 text-sm">
//         My Profile
//       </DropdownMenuLabel>

//       <DropdownMenuSeparator className="bg-zinc-700" />

//       <div className="px-2 py-2 space-y-2.5">
//         <div className="flex items-center gap-2.5">
//           <User size={15} className="text-zinc-400 shrink-0" />
//           <span className="text-[13px] font-medium text-zinc-200 truncate">
//             {userDetails?.name}
//           </span>
//         </div>

//         <div className="flex items-center gap-2.5">
//           <Mail size={15} className="text-zinc-400 shrink-0" />
//           <span className="text-[13px] font-medium text-zinc-200 truncate">
//             {userDetails?.email}
//           </span>
//         </div>

//         <div className="flex items-center gap-2.5">
//           <ShieldCheck size={15} className="text-zinc-400 shrink-0" />
//           <span className="text-[13px] font-medium text-zinc-200 capitalize truncate">
//             {userDetails?.authProvider}
//           </span>
//         </div>
//       </div>

//       <DropdownMenuSeparator className="bg-zinc-700" />

//       <DropdownMenuItem
//         onClick={logout}
//         className="rounded-lg cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 mt-1 px-2 py-2"
//       >
//         <div className="flex items-center gap-2.5 text-red-400 font-semibold text-[13px]">
//           <LogOut size={15} />
//           Logout
//         </div>
//       </DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>

//   <button
//     className={
//       isLoggedIn
//         ? 'block'
//         : 'hidden'
//     }
//     aria-label="Rewards"
//   >
//     <IoGiftOutline
//       size={23}
//       className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
//     />
//   </button>

//   <Button
//     className={
//       isLoggedIn
//         ? 'hidden'
//         : 'bg-orange-400 hover:bg-orange-500 ml-1 text-white h-9 px-4 font-medium shadow-sm transition-colors'
//     }
//     onClick={openLogin}
//   >
//     Login
//   </Button>
// </div>

   
//     </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { User, Mail, ShieldCheck, LogOut } from 'lucide-react';
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
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  console.log('rerender')

 const [selectLogo,setLogo]=useState(logo);
 const{openLogin}=useAuth();
 const {isLoggedIn , setLoggedIn,setUserDetails, userDetails ,loadAllChats}=useAuth();

const initials = userDetails?.name
  ?.split(' ')
  ?.slice(0, 2)
  ?.reduce((acc, word) => acc + word[0], '')
  ?.toUpperCase() || '';

  const logout = async()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout` , {withCredentials:true});
      if(res.data.success){
        localStorage.removeItem('loggedIn')
        toast.error('Logged-out')
            setUserDetails(null);
            setLoggedIn(false);
           
            loadAllChats();
            
            
            
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }

const modeColors = {
  student: "bg-[#0B0C10]",
  creator: "bg-[#241417]",
  finance: "bg-[#0E1B24]",
};

const [mode, setMode] = useState("student");

const changemode=(mode)=>{
  setMode(mode)
toast.success(` ${mode} mode`)
}


 

console.log(modeColors[mode])


  return (
    <div className="fixed w-full border-b border-[#C9A96A]/20 shadow-[0_1px_20px_rgba(0,0,0,0.35)] z-50">

    
    <div className={` ${modeColors[mode]} flex w-full h-[64px] px-5 md:px-8 justify-around items-center bg-[#0B0C10] transition-colors duration-300` }>
      {/* logo-section*/}
      <div className="flex items-center gap-3">
        
         <DropdownMenu >
          <DropdownMenuTrigger className='hover:cursor-pointer outline-none rounded-full ring-1 ring-[#C9A96A]/30 hover:ring-[#C9A96A]/70 transition-all duration-200'>
             <img className="rounded-full" src={selectLogo} alt="logo" width={42} />
           
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-[#15161B] border border-[#C9A96A]/15 shadow-xl rounded-xl mt-4 ml-7 p-1.5'>
            <DropdownMenuLabel className='text-[#C9A96A] text-[11px] font-semibold tracking-wide px-2 pt-1.5 pb-1'>Choose Mode</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#C9A96A]/10" />


            <DropdownMenuItem className='rounded-lg hover:bg-[#C9A96A]/10 focus:bg-[#C9A96A]/10 cursor-pointer px-2 py-2'
             onClick={()=>{setLogo(logo) ; changemode("student")}}>  <img className="rounded-full ring-1 ring-[#C9A96A]/20" src={logo}
             alt="logo" width={30}  />
             
              <span className="text-[13px] font-medium pl-2 text-zinc-200">Student</span></DropdownMenuItem>
            
            
            
            <DropdownMenuItem className='rounded-lg hover:bg-[#C9A96A]/10 focus:bg-[#C9A96A]/10 cursor-pointer px-2 py-2' onClick={()=>{setLogo(logo2) ; changemode("finance")}}>
                 <img className="rounded-full ring-1 ring-[#C9A96A]/20" src={logo2}
             alt="logo" width={30} />
                <span className="pl-2 text-[13px] font-medium text-zinc-200">Finance</span></DropdownMenuItem>
            
            
            
            <DropdownMenuItem className='rounded-lg hover:bg-[#C9A96A]/10 focus:bg-[#C9A96A]/10 cursor-pointer px-2 py-2' onClick={()=>{setLogo(logo3) ; changemode("creator")}}>
                 <img className="rounded-full ring-1 ring-[#C9A96A]/20" src={logo3}
             alt="logo" width={30} />
                <span className="text-[13px] font-medium pl-2 text-zinc-200">Creator</span></DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
        
        
              </div>

      {/* center-section */}
      <div className="hidden sm:flex items-center gap-1 md:gap-2">

        <li className="list-none ">
          <Link to='/'
          className="text-[13px] md:text-sm font-medium text-zinc-300
    px-3.5 py-2 rounded-md
    transition-all duration-200 ease-out
    hover:text-[#C9A96A] hover:bg-white/[0.04] "
          >Dashboard</Link>
          
        </li>
        <li className=" list-none ">
          <Link 
            className="text-[13px] md:text-sm font-medium text-zinc-300
    px-3.5 py-2 rounded-md
    transition-all duration-200 ease-out
    hover:text-[#C9A96A] hover:bg-white/[0.04] "
          to='/about'>About</Link>
          
        </li>
        <li className="list-none" >
          <Link
            className="text-[13px] md:text-sm font-medium text-zinc-300
    px-3.5 py-2 rounded-md
    transition-all duration-200 ease-out
    hover:text-[#C9A96A] hover:bg-white/[0.04]"
          to='/support'>Support</Link>
          
        </li>


      </div>
      {/* profile-section */}
<div className="flex items-center gap-3 md:gap-4">
  <DropdownMenu>
    <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/60 rounded-full transition-shadow">
      <Avatar
        className={
          isLoggedIn
            ? 'block bg-[#1B1D23] ring-1 ring-[#C9A96A]/30 hover:ring-[#C9A96A]/70 transition-all duration-200 cursor-pointer'
            : 'hidden'
        }
      >
        <AvatarImage />
        <AvatarFallback className="text-[#C9A96A] font-semibold text-[13px]">
          {initials}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="mr-1 mt-3 w-64 bg-[#15161B] border border-[#C9A96A]/15 shadow-2xl rounded-xl p-1.5">
      <DropdownMenuLabel className="text-zinc-100 font-semibold px-2.5 py-2 text-[13px] tracking-wide">
        My Profile
      </DropdownMenuLabel>

      <DropdownMenuSeparator className="bg-[#C9A96A]/10" />

      <div className="px-2.5 py-2.5 space-y-2.5">
        <div className="flex items-center gap-2.5">
          <User size={14} className="text-[#C9A96A]/70 shrink-0" />
          <span className="text-[13px] font-medium text-zinc-300 truncate">
            {userDetails?.name}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Mail size={14} className="text-[#C9A96A]/70 shrink-0" />
          <span className="text-[13px] font-medium text-zinc-300 truncate">
            {userDetails?.email}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <ShieldCheck size={14} className="text-[#C9A96A]/70 shrink-0" />
          <span className="text-[13px] font-medium text-zinc-300 capitalize truncate">
            {userDetails?.authProvider}
          </span>
        </div>
      </div>

      <DropdownMenuSeparator className="bg-[#C9A96A]/10" />

      <DropdownMenuItem
        onClick={logout}
        className="rounded-lg cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 mt-1 px-2.5 py-2.5"
      >
        <div className="flex items-center gap-2.5 text-red-400 font-medium text-[13px]">
          <LogOut size={14} />
          Logout
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <button
    className={
      isLoggedIn
        ? 'block'
        : 'hidden'
    }
    aria-label="Rewards"
  >
    <IoGiftOutline
      size={21}
      className="text-[#C9A96A] hover:text-[#DEC28B] transition-colors cursor-pointer"
    />
  </button>

  <Button
    className={
      isLoggedIn
        ? 'hidden'
        : 'bg-[#C9A96A] hover:bg-[#DEC28B] text-[#0B0C10] h-9 px-5 font-semibold text-[13px] tracking-wide shadow-sm transition-colors border-none'
    }
    onClick={openLogin}
  >
    Login
  </Button>
</div>

   
    </div>
    </div>
  );
};

export default Navbar;