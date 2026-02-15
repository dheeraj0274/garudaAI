// import { useLocation } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { IoSend } from "react-icons/io5";
// import { useEffect, useState } from "react";
// 
// import { AiOutlinePlus } from 'react-icons/ai'
// import { BiMicrophone } from 'react-icons/bi'
// import { FaRegEdit } from "react-icons/fa";


// import { useRef } from "react";
// import {useAuth} from '../context/authContext'
// import { BeatLoader } from "react-spinners";
// import API from "../lib/axios";


// const Chat = () => {
//   const [editingIndex, setEditingIndex] = useState(null);
// const [editedText, setEditedText] = useState("");


//  const [messages, setMessages] = useState({
//   role:'model',
//   text:'hi i am garuda'
//  });

//   const [input, setInput] = useState("");
//   console.log('messages',messages);


//    const {loading ,setLoading} =useAuth();



 
      
      
    
 

//   const saveEdit = (i)=>{
//     const updated = [...messages]

//     if(editedText.trim()===''){
//       updated.splice(i,1)
//     }
//     else{
//       updated[i].text=editedText;
//     }
//     setMessages(updated);
//     setEditingIndex(null);
//   }
// const sendPrompt = async (messageText) => {
//   if (!messageText.trim()) return;
//   console.log('message' , messageText);
  

//   const userMsg = { role: 'user', text: messageText };
//   setMessages(prev => [...prev, userMsg]);
//   setLoading(true);

//   try {
//     const res = await API.post('/chat/newchat', { prompt: messageText });
//     const botReply = res.data.reply;
//     setMessages(prev => [...prev, { role: 'model', text: botReply }]);
//   } catch (error) {
//     console.error(error);
//     setMessages(prev => [...prev, { role: 'model', text: "Sorry, couldn't get response." }]);
//   } finally {
//     setLoading(false);
//     setInput(""); // clear input AFTER sending
//   }
// };


//   // const sendPrompt = async()=>{

//   //   if(!input.trim()) return ;

//   //   const userMsg = {role:'user',text:input};
//   //   setMessages((prev)=>[...prev,userMsg]);
//   //   setInput('');
//   //   setLoading(true);


//   //   setTimeout(()=>{
//   //    const Botreply=  getBotReply(input);
//   //    console.log('notreply' , Botreply);
     
//   //    setMessages((prev)=>[...prev,{role:'assistant' , text:Botreply}]);
//   //    setLoading(false)
  
//   //   },3000)



//   // }
//   // const getBotReply = (userText)=>{
//   //   const words = userText.toLowerCase().split(" ");

//   //   for(let item of responses){
//   //     for(let keyword of item.keywords){
//   //       if(words.includes(keyword)){
//   //         return item.reply;
//   //       }
//   //     }
//   //   }
//   //   return "Sorry i didn't understand that";

//   // }



//   return (
//     <div className="flex flex-col mt-15 min-h-screen bg-gray-900 text-white w-full">
//         <div className="fixed">
//                <SidebarTrigger/>
//             </div>
     
      

//       <div className="flex-1 overflow-y-auto p-4  space-y-4">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`max-w-[70%] p-2 mt-9 rounded-2xl indent-1.5 ${
//               msg.role === "user"
//                 ? "ml-auto bg-gray-500"
//                 : "ml-7  bg-gray-700"
//             }`}
//           >
//             <div className="flex justify-between items-center">
//               {editingIndex === i ? (
//   <input
//     value={editedText}
//     onChange={(e) => setEditedText(e.target.value)}
//     onBlur={saveEdit}
//     onKeyDown={(e) => {
//       if (e.key === "Enter") saveEdit(i);
//     }}
//     autoFocus
//     className="bg-transparent border-b border-gray-400 outline-none w-full text-white"
//   />
// ) : (
//   msg.text
// )}
              
//               {
//                 messages.length==0 ? null  : msg.role=='model' ? null :<FaRegEdit className="pr-3 cursor-pointer"
//              size={30}
//              onClick={()=>{
//                 setEditingIndex(i);
//                 setEditedText(msg.text)
//              }}/>
//               }
            
//               </div>
           
            
//           </div>
//         ))}
//         {loading && (
//   <div className="ml-7 max-w-[70%] p-3 rounded-2xl bg-gray-700">
//     <BeatLoader color="#9CA3AF" size={8} />
//   </div>
// )}

//       </div>

      
//       <div className=" fixed bottom-12 w-[90%] md:w-[60%] md:left-[17rem]  border-gray-700 p-3 left-8 ">
//         <div className="w-full flex justify-center items-center ">
//                <div className="w-[90%] h-15 flex justify-between p-3 items-center bg-zinc-600 rounded-2xl">

//                 <div className="flex items-center gap-2 ">
//                <AiOutlinePlus className="cursor-pointer" size={20}/>
//                <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onClick={() => sendPrompt(input)}
//            onKeyDown={(e)=>{
//               if(e.key==='Enter') sendPrompt(input);

//             }}
//           placeholder="Ask to Garuda"
//           className="bg-transparent md:w-[400px] text-white border-0 focus-visible:ring-0"
//         />

//                 </div>
//                 <div className="flex items-center gap-2">
//                     <BiMicrophone size={20} className="cursor-pointer"/>
//                     {input.trim() && (
//           <IoSend
//             size={24}
//             className="cursor-pointer text-green-500"
//             onClick={() => {
//               // setMessages([...messages, { role: "user", text: input }]);
//               setInput("");
//               sendPrompt();
              
//             }}
           
//           />
//         )}

//                 </div>
             
        
//         </div>
//         </div>
        
       
//       </div>
//     </div>
//   );
// };

// export default Chat;
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { SidebarTrigger } from "../components/ui/sidebar";
import API from "../lib/axios";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi, I am Garuda!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPrompt = async (messageText) => {
    if (!messageText.trim()) return;

   
    setMessages((prev) => [...prev, { role: "user", text: messageText }]);
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/prompt`, { prompt: messageText  }, { withCredentials: true });
      const botReply = res.data.reply;
      console.log('reply',botReply);
      
    
      setMessages((prev) => [...prev, { role: "model", text: botReply }]);
    } catch (error) {
      console.log(error.messages);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, couldn't get response." },
      ]);
    } finally {
      setLoading(false);
      setInput(""); 
    }
  };

  return (
    <div className="flex flex-col pt-[120px]   min-h-screen bg-gray-900 text-white w-full p-4">
       
<div className="fixed">
                 <SidebarTrigger/>
             </div>
   
    <div className="flex flex-col pl-12 mt-7  min-h-screen bg-gray-900 text-white w-full p-4">
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-3 rounded-2xl ${
              msg.role === "user" ? "ml-auto bg-gray-500" : "bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="max-w-[70%] p-3 rounded-2xl bg-gray-700">
            <BeatLoader color="#9CA3AF" size={8} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-12 w-[90%] md:w-[60%] md:left-[17rem]  border-gray-700 p-3 left-8">

      
      <div className="flex items-center gap-2 w-full">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendPrompt(input);
            }
          }}
          placeholder="Ask Garuda..."
          className="bg-gray-800 flex-1 text-white border-0 focus-visible:ring-0 rounded-2xl p-3"
        />
        <IoSend
          size={24}
          className="cursor-pointer text-green-500"
          onClick={() => sendPrompt(input)}
        />
      </div>
      </div>
    </div>
     </div>
  );
};

export default Chat;

