
// import { useState , useRef,useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { IoSend } from "react-icons/io5";
// import { BeatLoader } from "react-spinners";
// import { SidebarTrigger } from "../components/ui/sidebar";
// import API from "../lib/axios";
// import axios from "axios";

// const Chat = () => {
//   const [messages, setMessages] = useState([
//     { role: "model", text: "Hi, I am Garuda!" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
  

//   const sendPrompt = async (messageText) => {
//     if (!messageText.trim()) return;

   
//     setMessages((prev) => [...prev, { role: "user", text: messageText }]);
//     setLoading(true);

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/prompt`, { prompt: messageText  }, { withCredentials: true });
//       const botReply = res.data.reply;
//       console.log('reply',botReply);
      
    
//       setMessages((prev) => [...prev, { role: "model", text: botReply }]);
//     } catch (error) {
//       console.log(error.messages);
//       setMessages((prev) => [
//         ...prev,
//         { role: "model", text: "Sorry, couldn't get response." },
//       ]);
//     } finally {
//       setLoading(false);
//       setInput(""); 
//     }
//   };

//   const messagesEndRef=useRef(null);
//   const [showScrollBtn , setShowScrollBtn]=useState(false)

//   useEffect(()=>{
//     // messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
//     const div = messagesEndRef.current;
//      if (!div) return;
//     const handleScroll=()=>{
//       const isAtBottom = div.scrollHeight - div.scrollTop <=div.clientHeight +50;
//       setShowScrollBtn(!isAtBottom);
//     }
//     div.addEventListener('scroll',handleScroll);
//     return ()=> div.removeEventListener('scroll',handleScroll)
//   }
//   ,[])


//   useEffect(() => {
//   const div = messagesEndRef.current;
//   if (!div) return;

//   const isAtBottom =
//     div.scrollHeight - div.scrollTop <= div.clientHeight + 50;

//   setShowScrollBtn(!isAtBottom);
// }, [messages, loading]);


//   const scrollToBottom = () => {
//   messagesEndRef.current.scrollTo({
//     top: messagesEndRef.current.scrollHeight,
//     behavior: "smooth",
//   });
// };


    
//   return (
//     <div  className="flex flex-col h-screen pt-[120px] bg-gray-900 text-white w-full">
       
// <div className="fixed">
//                  <SidebarTrigger/>
//              </div>
   
//     <div className="flex flex-col flex-1 pl-12 mt-7 mb-7 bg-gray-900 text-zinc-300 w-full p-4 overflow-hidden">
      
//       {/* Messages */}
//       <div ref={messagesEndRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pb-[50px]">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`max-w-[70%] p-3 rounded-2xl ${
//               msg.role === "user" ? "ml-auto bg-gray-600" : "bg-gray-800"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {loading && (
//           <div className="max-w-[70%] p-3 rounded-2xl bg-gray-700">
//             <BeatLoader color="#9CA3AF" size={8} />
//           </div>
//         )}
//       </div>
     

     
//     </div>
//     {showScrollBtn && (
//   <button
//     onClick={scrollToBottom}
//     className="fixed bottom-[120px] right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
//   >
//     ↓ New Messages
//   </button>
// )}

//      {/* Input */}
//       <div 
//       // className="fixed bottom-12 w-[90%] md:w-[60%] md:left-[17rem]  border-gray-700 p-3 left-8"
//        className="fixed  bottom-0 rounded-2xl w-[95%] md:w-[80%] h-[100px]  backdrop-blur-md  md:left-[17rem]  border-gray-700 p-3"
      
//       >
//         <div className="flex justify-center items-center flex-col w-full h-full ">
//           <div className="flex items-center justify-center gap-2 w-full">
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               sendPrompt(input);
//             }
//           }}
//           placeholder="Ask Garuda..."
//           className="bg-gray-800 md:w-[80%]   w-[430px] text-white border-0 focus-visible:ring-0 rounded-2xl p-3 h-13"
//         />
//         <IoSend
//           size={24}
//           className="cursor-pointer text-green-500"
//           onClick={() => sendPrompt(input)}
//         />
//       </div>
//       <div>
//         <span className="font-light text-[12px]">Grauda can make mistakes, Check Important Info</span>
//       </div>

//         </div>

      
      
//       </div>
//      </div>
//   );
// };

// export default Chat;



import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { FaArrowCircleDown } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { SidebarTrigger } from "../components/ui/sidebar";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi, I am Garuda!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesRef = useRef(null);

  // ✅ Send Prompt
  const sendPrompt = async (messageText) => {
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: messageText }]);
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/prompt`,
        { prompt: messageText },
        { withCredentials: true }
      );

      setMessages((prev) => [
        ...prev,
        { role: "model", text: res.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, couldn't get response." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // ✅ Scroll Listener (for button)
  useEffect(() => {
    const div = messagesRef.current;
    if (!div) return;

    const handleScroll = () => {
      const isAtBottom =
        div.scrollHeight - div.scrollTop <= div.clientHeight + 50;

      setShowScrollBtn(!isAtBottom);
    };

    div.addEventListener("scroll", handleScroll);
    return () => div.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll user message to TOP when sent
  useEffect(() => {
    if (!messages.length) return;

    const lastIndex = messages.length - 1;
    const lastMessage = messages[lastIndex];

    if (lastMessage.role === "user") {
      const element = document.getElementById(`msg-${lastIndex}`);

      element?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [messages]);

  const scrollToBottom = () => {
    const div = messagesRef.current;
    if (!div) return;

    div.scrollTo({
      top: div.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col h-screen pt-[120px] bg-gray-900 text-white w-full">
      
      <div className="fixed">
        <SidebarTrigger />
      </div>

      {/* Chat Container */}
      <div className="flex flex-col flex-1 pl-12 mt-7 mb-7 bg-gray-900 text-zinc-300 w-full p-4 overflow-hidden">
        
        {/* Messages */}
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto space-y-4 pr-2 pb-40"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              id={`msg-${i}`}
              className={`max-w-[70%] p-3 rounded-2xl ${
                msg.role === "user"
                  ? "ml-auto bg-gray-600"
                  : "bg-gray-800"
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
      </div>

      {/* Scroll Button */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-[120px] right-[40%]  text-white px-4 py-2 rounded-full shadow-lg"
        >
          <FaArrowCircleDown size={25} color="orange"/>
        </button>
      )}

      {/* Input */}
      <div className="fixed bottom-0 rounded-2xl w-[95%] md:w-[80%] h-[100px] backdrop-blur-md md:left-[17rem] border-gray-700 p-3">
        <div className="flex justify-center items-center flex-col w-full h-full">
          <div className="flex items-center justify-center gap-2 w-full">
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
              className="bg-gray-800 md:w-[80%] w-[430px] text-white border-0 focus-visible:ring-0 rounded-2xl p-3"
            />

            <IoSend
              size={24}
              className="cursor-pointer text-green-500"
              onClick={() => sendPrompt(input)}
            />
          </div>

          <div>
            <span className="font-light text-[12px]">
              Garuda can make mistakes. Check important info.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
