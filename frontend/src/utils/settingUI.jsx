import React, { useState } from "react";

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

const General = () => {

    const [theme , setTheme]=useState('Dark')


  return (
    <div className="w-full p-5">
      <div className="border-b-1 pb-3 pt-2">
        <span>General</span>
      </div>

     <div className="mt-3">
               <div className="flex items-center justify-between">
        <span className="font-light">Appearance</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className='outline-none font-light border-none hover:bg-zinc-700' >{theme} <RiArrowDropDownLine size={30}/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-zinc-700 border-none'>
            <DropdownMenuGroup className='text-white font-light '>
              
              <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setTheme('System')}>System</DropdownMenuItem>
              <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setTheme('Dark')}>Dark</DropdownMenuItem>
               <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setTheme('Light')}>Light</DropdownMenuItem>
            </DropdownMenuGroup >
          
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
     </div>
     
    </div>
  );
};

const Notification = () => {
  return <div>Notification</div>;
};

const Personalization = () => {
  return <div>Personalization</div>;
};
const DataControl = () => {
  return <div>Data Control</div>;
};
const Security = () => {
  return <div>Security</div>;
};
const Account = () => {
  return <div>Account</div>;
};

export {
  General,
  Notification,
  DataControl,
  Personalization,
  Security,
  Account,
};
