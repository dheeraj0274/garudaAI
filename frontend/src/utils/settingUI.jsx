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
import { IoColorFill } from "react-icons/io5";

const General = () => {


    const colorData=[
        {
            name:'Default',
            value:"bg-zinc-500"
        },
         {
            name:'green',
            value:" bg-green-500"
        },
        {
            name:'yellow',
            value:"bg-yellow-500"
        },
        {
            name:'pink',
            value:" bg-pink-500"
        },
        {
            name:'purple',
            value:" bg-purple-500"
        },

    ]

    const [theme , setTheme]=useState('Dark')
    const[contrast,setContrast]=useState('System')
    const[accColor,setaccColor]=useState({
        text:"default" , 
        color: colorData.zinc
    })


  return (
    <div className="w-full p-5">
      <div className="border-b-1 pb-3 pt-2">
        <span>General</span>
      </div>

     <div className="mt-3">
               <div className="flex items-center justify-between border-b-1 mt-3 pb-2 border-zinc-600">
        <span className="font-extralight">Appearance</span>
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

       <div className="flex items-center justify-between border-b mt-5 pb-2 border-zinc-600 ">
        <span className="font-extralight">Contrast</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className='outline-none font-light border-none hover:bg-zinc-700' >{contrast} <RiArrowDropDownLine size={30}/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-zinc-700 border-none'>
            <DropdownMenuGroup className='text-white font-light '>
              
              <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setContrast('System')}>System</DropdownMenuItem>
              <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setContrast('Medium')}>Medium</DropdownMenuItem>
               <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setContrast('High')}>High</DropdownMenuItem>
            </DropdownMenuGroup >
          
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
       <div className="flex items-center justify-between border-b mt-5 pb-2 border-zinc-600">
        <span className="font-extralight">Accent Color</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className='outline-none font-light border-none hover:bg-zinc-700' ><span className={`w-2 h-2 rounded-full ${accColor.value}`}></span>{accColor.name}  <RiArrowDropDownLine size={30}/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-zinc-700 border-none'>
            <DropdownMenuGroup className='text-white font-light '>
              
              {/* <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColoraccColor('System')}>

                <span className="w-2 h-2 rounded-full bg-zinc-500"></span>Default</DropdownMenuItem>

              <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('green')}>

                <span className="w-2 h-2 rounded-full bg-green-500"></span>green</DropdownMenuItem>

               <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('yellow')}>

                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>yellow</DropdownMenuItem>


                 <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('pink')}>

                <span className="w-2 h-2 rounded-full bg-pink-500"></span>pink</DropdownMenuItem>

                 <DropdownMenuItem className='hover:bg-zinc-900' onClick={()=>setaccColor('purple')}>

                <span className="w-2 h-2 rounded-full bg-purple-500"></span>purple</DropdownMenuItem> */}
                {
                    colorData.map((item)=>(
                        
                            <DropdownMenuItem  className='hover:bg-zinc-900' onClick={()=>setaccColor(item)}>
                                <span className={`w-2 h-2 rounded-full ${item.value}`}></span>{item.name}


                            </DropdownMenuItem>
                        
                    ))
                }

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
