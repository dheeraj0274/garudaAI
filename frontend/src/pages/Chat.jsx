import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { SidebarTrigger } from "../components/ui/sidebar";
import { AiOutlinePlus } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { FaRegEdit } from "react-icons/fa";

const Chat = () => {
  const [editingIndex, setEditingIndex] = useState(null);
const [editedText, setEditedText] = useState("");

  const location = useLocation();
  const initialPrompt = location.state?.prompt || "";

  const [messages, setMessages] = useState([
    { role: "user", text: initialPrompt }
  ]);
  const [input, setInput] = useState("");


  const saveEdit = (i)=>{
    const updated = [...messages]

    if(editedText.trim()===''){
      updated.splice(i,1)
    }
    else{
      updated[i].text=editedText;
    }
    setMessages(updated);
    setEditingIndex(null);
  }

  return (
    <div className="flex flex-col mt-15 h-screen bg-gray-900 text-white w-full">
        <div className="fixed">
               <SidebarTrigger/>
            </div>
     
      

      <div className="flex-1 overflow-y-auto p-4  space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-2 rounded-2xl indent-1.5 ${
              msg.role === "user"
                ? "ml-auto bg-gray-500"
                : "mr-auto bg-gray-700"
            }`}
          >
            <div className="flex justify-between items-center">
              {editingIndex === i ? (
  <input
    value={editedText}
    onChange={(e) => setEditedText(e.target.value)}
    onBlur={saveEdit}
    onKeyDown={(e) => {
      if (e.key === "Enter") saveEdit(i);
    }}
    autoFocus
    className="bg-transparent border-b border-gray-400 outline-none w-full text-white"
  />
) : (
  msg.text
)}
              
              {
                messages.length==0 ? null  : <FaRegEdit className="pr-3 cursor-pointer"
             size={30}
             onClick={()=>{
                setEditingIndex(i);
                setEditedText(msg.text)
             }}/>
              }
            
              </div>
           
            
          </div>
        ))}
      </div>

      
      <div className=" fixed bottom-12 w-[90%] md:w-[60%] md:left-[17rem]  border-gray-700 p-3 left-8 ">
        <div className="w-full flex justify-center items-center ">
               <div className="w-[90%] h-15 flex justify-between p-3 items-center bg-zinc-600 rounded-2xl">

                <div className="flex items-center gap-2 ">
               <AiOutlinePlus className="cursor-pointer" size={20}/>
               <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask to Garuda"
          className="bg-transparent w-[400px] text-white border-0 focus-visible:ring-0"
        />

                </div>
                <div className="flex items-center gap-2">
                    <BiMicrophone size={20} className="cursor-pointer"/>
                    {input.trim() && (
          <IoSend
            size={24}
            className="cursor-pointer text-green-500"
            onClick={() => {
              setMessages([...messages, { role: "user", text: input }]);
              setInput("");
            }}
          />
        )}

                </div>
             
        
        </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default Chat;
