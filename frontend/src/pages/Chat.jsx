import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { IoSend } from "react-icons/io5";
import { FaArrowCircleDown } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { SidebarTrigger } from "../components/ui/sidebar";
import axios from "axios";
import { useAuth } from "../context/authContext";
import MessageRenderer from "../components/MessageRenderer";
import { useLocation } from "react-router-dom";
const Chat = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const {
    chats,
    setChats,
    currentchatId,
    setCurrentchatId,
    messages,
    setMessages,
  } = useAuth();

  const messagesRef = useRef(null);

  useEffect(() => {
    const fetchChat = async () => {
      if (!currentchatId) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/chat/${currentchatId}`,
          { withCredentials: true },
        );
        console.log("res", res.data);
        setMessages(res.data.chats.messages || []);
        localStorage.setItem("chatid", currentchatId);
      } catch (err) {
        console.log("Error loading chat:", err);
      }
    };

    fetchChat();
  }, [currentchatId]);

  const sendPrompt = async (messageText) => {
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: messageText }]);
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/prompt`,
        {
          prompt: messageText,
          chatId: currentchatId,
        },
        { withCredentials: true },
      );

      const newChatId = res.data.chatId;

      if (!currentchatId) {
        setCurrentchatId(newChatId);
      }

      setChats((prev) => {
        const exists = prev?.find((c) => c._id === newChatId);

        if (!exists) {
          return [
            ...prev,
            {
              _id: newChatId,
              title: messageText.slice(0, 20),
            },
          ];
        }
        return prev;
      });

      setMessages((prev) => [...prev, { role: "model", text: res.data.reply }]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Error getting response." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

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
  useEffect(() => {
    setShowScrollBtn(false);
  }, [currentchatId]);

  useEffect(() => {
    const div = messagesRef.current;
    if (!div) return;

    div.scrollTo({
      top: div.scrollHeight,
      behavior: "smooth",
    });
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
    <div className="flex flex-col  pt-[120px] w-full bg-zinc-800 text-white w-full">
      <div className="fixed">
        <SidebarTrigger />
      </div>

      <div className="flex flex-col justify-center items-center md:pl-12 mt-7 mb-7 bg-zinc-800 text-zinc-300 w-full p-4 overflow-hidden">
        <div
          ref={messagesRef}
          className="flex-1 max-w-full justify-center  md:max-w-[90%] items-center overflow-y-auto space-y-4 pr-2 pb-40"
        >
        

         
          {messages.map((msg, i) => (

            <div
              key={i}
              className={`flex justify-center items-center  md:max-w-full  ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
                <div className="flex flex-col justify-center items-center">
              <div
                className={` p-2 px-4 rounded-xl wrap-break-words ${
                  msg.role === "user" ? "ml-auto bg-zinc-700 text-white" : ""
                }`}
              >
                {msg.role === "model" ? (
                  <MessageRenderer text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
               </div>
          ))}
        

          {loading && (
            <div className="max-w-[70%] p-3 rounded-2xl bg-gray-700">
              <BeatLoader color="#9CA3AF" size={8} />
            </div>
          )}
        </div>
      </div>

      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-[120px] right-[40%]"
        >
          <FaArrowCircleDown size={25} color="orange" />
        </button>
      )}

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
              className="bg-zinc-700 md:w-[80%] w-[430px] text-white border-0 rounded-2xl p-3"
            />

            <IoSend
              size={24}
              className="cursor-pointer text-green-500"
              onClick={() => sendPrompt(input)}
            />
          </div>

          <span className="font-light text-[12px]">
            Garuda can make mistakes. Check important info.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
