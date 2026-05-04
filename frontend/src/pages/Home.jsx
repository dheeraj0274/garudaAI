import React, { useState , useEffect } from "react";
import ESidebar from "../components/ESidebar";

import { CiCirclePlus } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Input } from "@/components/ui/input"
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoSend } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import { animate, stagger } from "motion";


const text = "A new standard of research";
const header = "Garuda-AI"






const Home = () => {

   const [prompt , setPrompt]=useState('')

   const navigate = useNavigate()
    

   const promptSumbit= async()=>{
    navigate('/chat' , {
      state:{prompt}
    });

   }
     useEffect(() => {
     
    }
  , []);
  useEffect(() => {

    //header-animation-part
    const letters = document.querySelectorAll(".fall-char");



    animate(
      letters,
      {
        transform: ["translateY(-60px)", "translateY(0px)"],
        opacity: [0, 1],
      },
      {
        duration: 1,
        delay: stagger(0.08),
        easing: "ease-out",
      }
      
    );

    //text-animation-part
     setTimeout(() => {
          const elements = document.querySelectorAll(".char");

    animate(
      elements,
      { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0px)"] },
      {
        duration: 0.7,
        delay: stagger(0.05),
      }
    );
  
        
      }, 1500);
  }, []);


  return (
    <div className="flex flex-row mt-15 p-4  bg-gray-800 w-full">
      {/* <ESidebar /> */}
      <div >
        <SidebarTrigger className="text-white " />
      </div>
      <div className=" w-full">
        <div className="flex  items-center p-2 pt-20 flex-col w-full h-full">
          <div>
              
              
            </div>
          <div className="mt-9">
            

            <br />
              <span className="font-bold text-yellow-600 tracking-wide text-4xl">
               {header.split('').map((char,index)=>(
                <span key={index} className="fall-char inline-block opacity-0">{char ===' ' ? '\u00a0' : char}</span>
              ))} </span>
            <br />
            <p 
            
            className="font-mono md:text-5xl text-xl mt-2 text-zinc-300 ">
              {text.split('').map((char,index)=>(
                <span key={index} className="char inline-block opacity-0">{char ===' ' ? '\u00a0' : char}</span>
              ))}
            </p>
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
