

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [openSetting, setOpenSetting] = useState(false);

  const [chats, setChats] = useState([]);
  const [currentchatId, setCurrentchatId] = useState(null);
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi, I am Garuda!" },
  ]);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        { withCredentials: true }
      );


      if(res.data.success) {toast.success('Logged-In')

      setUserDetails(res.data.User || null);
      setLoggedIn(true);}
    } catch (err) {
      setUserDetails(null);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const isLogged = localStorage.getItem("loggedIn");

    if (!isLogged) {
      fetchUser();
      loadAllChats()
    } else {
      setLoading(false);
    }
  }, []);

 
  const loadAllChats = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/allchat`,
        {},
        { withCredentials: true }
      );
   console.log('chats',res.data)
      setChats(res.data.allChats || []);
    } catch (error) {
      console.log("chat error", error);
      setChats([]);
    }
  };

  const value = 
  useMemo(
   () => {
    return {
      showLogin,
      openLogin,
      closeLogin,
      showReg,
      setShowReg,
      loading,
      setLoading,
      userDetails,
      setUserDetails,
      isLoggedIn,
      setLoggedIn,
      chats,
      setChats,
      currentchatId,
      setCurrentchatId,
      messages,
      setMessages,
      loadAllChats,
      openSetting,
      setOpenSetting,
    }
  }
  , [
    showLogin,
    showReg,
    loading,
    userDetails,
    isLoggedIn,
    chats,
    currentchatId,
    messages,
    openSetting,
  ]);

  return (
    <AuthContext.Provider value={value}>
      { children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);