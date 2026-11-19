// import React, { useState , useEffect } from "react";
// import ESidebar from "../components/ESidebar";

// import { CiCirclePlus } from "react-icons/ci";
// import { VscSettings } from "react-icons/vsc";
// import { SidebarTrigger } from "../components/ui/sidebar";
// import { Input } from "@/components/ui/input"
// import { MdOutlineKeyboardVoice } from "react-icons/md";
// import { IoSend } from "react-icons/io5";

// import { useNavigate } from "react-router-dom";

// import { animate, stagger } from "motion";


// const text = "A new standard of research";
// const header = "Garuda-AI"






// const Home = () => {

//    const [prompt , setPrompt]=useState('')

//    const navigate = useNavigate()
    

//    const promptSumbit= async()=>{
//     navigate('/chat' , {
//       state:{prompt}
//     });

//    }
//      useEffect(() => {
     
//     }
//   , []);
//   useEffect(() => {

//     //header-animation-part
//     const letters = document.querySelectorAll(".fall-char");



//     animate(
//       letters,
//       {
//         transform: ["translateY(-60px)", "translateY(0px)"],
//         opacity: [0, 1],
//       },
//       {
//         duration: 1,
//         delay: stagger(0.08),
//         easing: "ease-out",
//       }
      
//     );

//     //text-animation-part
//      setTimeout(() => {
//           const elements = document.querySelectorAll(".char");

//     animate(
//       elements,
//       { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0px)"] },
//       {
//         duration: 0.7,
//         delay: stagger(0.05),
//       }
//     );
  
        
//       }, 1500);
//   }, []);


//   return (
//     <div className="flex flex-row mt-15 p-4 bg-black   w-full">
//       {/* <ESidebar /> */}
//       <div >
//         <SidebarTrigger className="text-white " />
//       </div>
//       <div className=" w-full">
//         <div className="flex  items-center p-2 pt-20 flex-col w-full h-full">
//           <div>
              
              
//             </div>
//           <div className="mt-9">
            

//             <br />
//               <span className="font-bold text-yellow-600 tracking-wide text-4xl">
//                {header.split('').map((char,index)=>(
//                 <span key={index} className="fall-char inline-block opacity-0">{char ===' ' ? '\u00a0' : char}</span>
//               ))} </span>
//             <br />
//             <p 
            
//             className="font-mono md:text-5xl text-xl mt-2 text-zinc-300 ">
//               {text.split('').map((char,index)=>(
//                 <span key={index} className="char inline-block opacity-0">{char ===' ' ? '\u00a0' : char}</span>
//               ))}
//             </p>
//           </div>
//           <div className="mt-8 rounded-2xl flex flex-col items-center justify-center  border border-lime-500 w-[90%] md:w-[50%] h-[120px]  ">
//             <div className=" w-[90%] h-[80%] pt-2">
//               <Input type="text" className=" text-gray-300 border-0 !border-none !outline-none
//              focus:!border-none focus:!outline-none
//              focus:!ring-0 focus:!ring-transparent" 
//              placeholder="Ask to Garuda" 
//              onChange={(e)=>setPrompt(e.target.value)}
//              onKeyDown={(e)=>{
//               if(e.key==='Enter') promptSumbit();
//              }}
//              />
             
//             </div>


//             <div className="w-[90%] flex  justify-between">
//               <div className="flex gap-5 p-2" >
//                      <CiCirclePlus color="white" size={25}/>
//                      <VscSettings color="white" size={25}/>
//               </div>
//               <div className="flex items-center pr-2 gap-3">
//                  <MdOutlineKeyboardVoice size={25} color="white"/>
//                   {
//                   prompt.trim() !== '' &&(
//                     <IoSend className="cursor-pointer " size={25} color="green" onClick={promptSumbit}/>

//                   )
//                  }
                 
//               </div>
             
//             </div>
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import ESidebar from "../components/ESidebar";

import { CiCirclePlus } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoSend } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import { animate, stagger } from "motion";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";



const text = "A new standard of research";
const header = "Garuda-AI";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const {isLoggedIn} = useAuth()

  const navigate = useNavigate();

  const promptSumbit = async () => {
    if (prompt.trim() === "") return;
    if(!isLoggedIn) {
     return  toast.warn('Login First!')
    }
    navigate("/chat", {
      state: { prompt },
    });
  };

  useEffect(() => {
   
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
    <div className="flex flex-row min-h-screen w-full bg-gradient-to-b from-black via-zinc-950 to-black">
    
      <div className="pt-4 pl-3">
       
               <SidebarTrigger className="text-[#C9A96A] hover:text-[#DEC28B] hover:bg-[#C9A96A]/10" />
           
      </div>

      <div className="w-full">
        <div className="flex items-center flex-col w-full h-full px-4 pt-16 md:pt-24">
       
          <div className="mt-12 text-center">
            <span className="font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-wide text-4xl md:text-5xl drop-shadow-sm">
              {header.split("").map((char, index) => (
                <span
                  key={index}
                  className="fall-char inline-block opacity-0"
                >
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </span>

            <p className="font-mono md:text-4xl text-lg mt-4 text-zinc-400 tracking-tight">
              {text.split("").map((char, index) => (
                <span key={index} className="char inline-block opacity-0">
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </p>
          </div>

        
          <div
            className="mt-12 rounded-2xl flex flex-col justify-between
            bg-zinc-900/60 backdrop-blur-xl
            border border-zinc-800 hover:border-lime-500/50
            focus-within:border-lime-500 focus-within:shadow-[0_0_0_1px_rgba(132,204,22,0.3),0_0_30px_-5px_rgba(132,204,22,0.25)]
            shadow-lg shadow-black/40
            transition-all duration-300
            w-full max-w-2xl min-h-[130px] p-4"
          >
            <Input
              type="text"
              value={prompt}
              className="text-gray-200 placeholder:text-zinc-500 text-base border-0 !border-none !outline-none
              bg-transparent px-1
              focus:!border-none focus:!outline-none
              focus:!ring-0 focus:!ring-transparent"
              placeholder="Ask Garuda anything..."
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") promptSumbit();
              }}
            />

            <div className="w-full flex items-center justify-between pt-2">
              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
                  aria-label="Add attachment"
                >
                  <CiCirclePlus color="#e4e4e7" size={22} />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
                  aria-label="Settings"
                >
                  <VscSettings color="#e4e4e7" size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
                  aria-label="Voice input"
                >
                  <MdOutlineKeyboardVoice size={22} color="#e4e4e7" />
                </button>

                <button
                  type="button"
                  onClick={promptSumbit}
                  disabled={prompt.trim() === ""}
                  className={`flex items-center justify-center rounded-full p-2 transition-all duration-200
                    ${
                      prompt.trim() !== ""
                        ? "bg-lime-500 hover:bg-lime-400 scale-100 opacity-100 cursor-pointer shadow-md shadow-lime-500/30"
                        : "scale-90 opacity-0 pointer-events-none"
                    }`}
                  aria-label="Send prompt"
                >
                  <IoSend size={18} color="black" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-zinc-600 text-xs mt-4 text-center max-w-md">
            Garuda-AI can make mistakes. Verify important research results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;