import React, { useState } from "react";
import { User, Mail, ShieldCheck, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../assets/LogoCrop.jpeg";
import logo2 from '../assets/CFinance.jpeg';
import logo3 from '../assets/CCreator.jpeg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { IoGiftOutline } from "react-icons/io5";
import { useAuth } from '../context/authContext';
import axios from "axios";
import { toast } from "react-toastify";

const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/support', label: 'Support' },
];

const Navbar = () => {
  const [selectLogo, setLogo] = useState(logo);
  const [mode, setMode] = useState("student");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { openLogin } = useAuth();
  const { isLoggedIn, setLoggedIn, setUserDetails, userDetails, loadAllChats } = useAuth();

  const initials = userDetails?.name
    ?.split(' ')
    ?.slice(0, 2)
    ?.reduce((acc, word) => acc + word[0], '')
    ?.toUpperCase() || '';

  const logout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, { withCredentials: true });
      if (res.data.success) {
        localStorage.removeItem('loggedIn');
        toast.error('Logged-out');
        setUserDetails(null);
        setLoggedIn(false);
        loadAllChats();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const modeColors = {
    student: "bg-[#0B0C10]",
    creator: "bg-[#241417]",
    finance: "bg-[#0E1B24]",
  };

  const changemode = (m) => {
    setMode(m);
    toast.success(`${m} mode`);
    setMobileOpen(false);
  };

  return (
    // z-50 + backdrop-blur so this bar always reads as its own layer,
    // even if another fixed/dark element (sidebar, drawer, etc.) sits behind it.
    <div className="fixed top-0 left-0 w-full z-50 border-b border-[#C9A96A]/20 shadow-[0_1px_20px_rgba(0,0,0,0.35)]">
      <div
        className={`${modeColors[mode]} flex w-full h-[60px] md:h-[64px] px-3 sm:px-5 md:px-8
          items-center justify-between backdrop-blur-md bg-opacity-95 transition-colors duration-300 overflow-x-hidden`}
      >
        {/* logo-section */}
        <div className="flex items-center gap-2 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer outline-none rounded-full ring-1 ring-[#C9A96A]/30 hover:ring-[#C9A96A]/70 transition-all duration-200 shrink-0">
              <img className="rounded-full" src={selectLogo} alt="logo" width={38} height={38} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={10}
              className="w-56 max-w-[calc(100vw-1.5rem)] bg-[#15161B] border border-[#C9A96A]/15 shadow-xl rounded-xl p-1.5"
            >
              <DropdownMenuLabel className="text-[#C9A96A] text-[11px] font-semibold tracking-wide px-2 pt-1.5 pb-1">
                Choose Mode
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#C9A96A]/10" />

              <DropdownMenuItem
                className="rounded-lg hover:bg-[#C9A96A]/10 focus:bg-[#C9A96A]/10 cursor-pointer px-2 py-2"
                onClick={() => { setLogo(logo); changemode("student"); }}
              >
                <img className="rounded-full ring-1 ring-[#C9A96A]/20" src={logo} alt="logo" width={28} height={28} />
                <span className="text-[13px] font-medium pl-2 text-zinc-200">Student</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="rounded-lg hover:bg-[#C9A96A]/10 focus:bg-[#C9A96A]/10 cursor-pointer px-2 py-2"
                onClick={() => { setLogo(logo2); changemode("finance"); }}
              >
                <img className="rounded-full ring-1 ring-[#C9A96A]/20" src={logo2} alt="logo" width={28} height={28} />
                <span className="pl-2 text-[13px] font-medium text-zinc-200">Finance</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="rounded-lg hover:bg-[#C9A96A]/10 focus:bg-[#C9A96A]/10 cursor-pointer px-2 py-2"
                onClick={() => { setLogo(logo3); changemode("creator"); }}
              >
                <img className="rounded-full ring-1 ring-[#C9A96A]/20" src={logo3} alt="logo" width={28} height={28} />
                <span className="text-[13px] font-medium pl-2 text-zinc-200">Creator</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* center-section — links visible from sm up, collapsed into a sheet below sm */}
        <div className="hidden sm:flex items-center gap-1 md:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[13px] md:text-sm font-medium text-zinc-300 px-3.5 py-2 rounded-md
                transition-all duration-200 ease-out hover:text-[#C9A96A] hover:bg-white/[0.04]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* profile + mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
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

            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="w-64 max-w-[calc(100vw-1.5rem)] bg-[#15161B] border border-[#C9A96A]/15 shadow-2xl rounded-xl p-1.5"
            >
              <DropdownMenuLabel className="text-zinc-100 font-semibold px-2.5 py-2 text-[13px] tracking-wide">
                My Profile
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#C9A96A]/10" />

              <div className="px-2.5 py-2.5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <User size={14} className="text-[#C9A96A]/70 shrink-0" />
                  <span className="text-[13px] font-medium text-zinc-300 truncate">{userDetails?.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-[#C9A96A]/70 shrink-0" />
                  <span className="text-[13px] font-medium text-zinc-300 truncate">{userDetails?.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={14} className="text-[#C9A96A]/70 shrink-0" />
                  <span className="text-[13px] font-medium text-zinc-300 capitalize truncate">{userDetails?.authProvider}</span>
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

          <button className={isLoggedIn ? 'block' : 'hidden'} aria-label="Rewards">
            <IoGiftOutline size={20} className="text-[#C9A96A] hover:text-[#DEC28B] transition-colors cursor-pointer" />
          </button>

          <Button
            className={
              isLoggedIn
                ? 'hidden'
                : 'bg-[#C9A96A] hover:bg-[#DEC28B] text-[#0B0C10] h-9 px-4 sm:px-5 font-semibold text-[13px] tracking-wide shadow-sm transition-colors border-none'
            }
            onClick={openLogin}
          >
            Login
          </Button>

          {/* hamburger — only shown below sm, where the link row is hidden */}
          <button
            className="sm:hidden p-1.5 -mr-1 text-zinc-300 hover:text-[#C9A96A] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile link sheet — slides under the bar, doesn't overlay/collide with anything else */}
      <div
        className={`sm:hidden overflow-hidden transition-[max-height] duration-200 ease-out
          ${mobileOpen ? 'max-h-60' : 'max-h-0'} bg-[#0B0C10] border-b border-[#C9A96A]/10`}
      >
        <div className="flex flex-col px-3 py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-[14px] font-medium text-zinc-300 px-3 py-2.5 rounded-md
                hover:text-[#C9A96A] hover:bg-white/[0.04] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;