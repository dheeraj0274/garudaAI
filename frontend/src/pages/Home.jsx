import React, { useState } from "react";
import ESidebar from "../components/ESidebar";

import { CiCirclePlus } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Input } from "@/components/ui/input"
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoSend } from "react-icons/io5";

import { useNavigate } from "react-router-dom";




const Home = () => {

   const [prompt , setPrompt]=useState('')

   const navigate = useNavigate()
    

   const promptSumbit= async()=>{
    navigate('/chat' , {
      state:{prompt}
    });

   }

  return (
    <div className="flex flex-row mt-15 p-4  bg-gray-800 w-full">
      {/* <ESidebar /> */}
      <div >
        <SidebarTrigger className="text-white " />
      </div>
      <div className=" w-full">
        <div className="flex  items-center p-2 pt-20 flex-col w-full h-full">
          <div>
              <span className="text-white font-semibold text-3xl">
                Made for CUTU assembles 🥰💖🌸
              </span>
              
            </div>
          <div className="mt-7">
            

            <br />
 <span className="font-bold text-yellow-600 tracking-wide text-4xl">GARUDA AI </span>
            <br />
            <p className="font-mono md:text-5xl text-2xl text-zinc-300 ">A new standard of Reasearch</p>
          </div>
          <div className="mt-8 rounded-2xl flex flex-col items-center justify-center  border border-lime-500 w-[90%] md:w-[50%] h-[120px]  ">
            <div className=" w-[90%] h-[80%] pt-2">
              <Input type="text" className=" text-gray-300 border-0 !border-none !outline-none
             focus:!border-none focus:!outline-none
             focus:!ring-0 focus:!ring-transparent" 
             placeholder="Ask to Garuda" 
             onChange={(e)=>setPrompt(e.target.value)}
             onKeyDown={(e)=>{
              if(e.key==='Enter') promptSumbit();
             }}
             />
             
            </div>


            <div className="w-[90%] flex  justify-between">
              <div className="flex gap-5 p-2" >
                     <CiCirclePlus color="white" size={25}/>
                     <VscSettings color="white" size={25}/>
              </div>
              <div className="flex items-center pr-2 gap-3">
                 <MdOutlineKeyboardVoice size={25} color="white"/>
                  {
                  prompt.trim() !== '' &&(
                    <IoSend className="cursor-pointer " size={25} color="green" onClick={promptSumbit}/>

                  )
                 }
                 
              </div>
             
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
