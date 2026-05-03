// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showReg, setShowReg] = useState(false);
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [userDetails, setUserDetails] = useState(null);
//   const [openSetting,setOpenSetting]=useState(false);

//   const openLogin = () => setShowLogin(true);
//   const closeLogin = () => setShowLogin(false);


//   const [chats,setChats]=useState([]);
//   const [currentchatId , setCurrentchatId] = useState(null)
//    const [messages, setMessages] = useState([
//     { role: "model", text: "Hi, I am Garuda!" },
//   ]);

 


 
//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
//         { withCredentials: true }
//       );
    
      

//       setUserDetails(res.data.User);
//       setLoggedIn(true);
//     } catch (err) {
//       setLoggedIn(false);
//       setUserDetails(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//  useEffect(()=>{
//   const  isLogged=localStorage.getItem('loggedIn')
//   if(isLogged){
//     fetchUser()
//   }
//   else {
//     setLoading(false)
//   }

  
//  },[])
 

 

// console.log(userDetails);
// const loadAllChats= async()=>{
// try {
//   const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/allchat`, {},{withCredentials:true} );
   

//   const data= res.data.allChats;
//   console.log('data',data)
  
//   setChats(data)
// } catch (error) {
//   console.log('error',error)
//   setChats(null)
  
// }

  




// }


//   return (
//     <AuthContext.Provider
//       value={{
//         showLogin,
//         openLogin,
//         closeLogin,
//         showReg,
//         setShowReg,
//         loading,
//         setLoading,
//         userDetails,
//         setUserDetails,
//         isLoggedIn,
//         setLoggedIn,
//         chats,
//         setChats,
//         currentchatId,
//         setCurrentchatId,
//         messages,
//         setMessages,
//         loadAllChats,
//         openSetting,
//         setOpenSetting
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

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
R
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        { withCredentials: true }
      );

      setUserDetails(res.data.User || null);
      setLoggedIn(true);
    } catch (err) {
      setUserDetails(null);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const isLogged = localStorage.getItem("loggedIn");

    if (isLogged) {
      fetchUser();
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

      setChats(res.data.allChats || []);
    } catch (error) {
      console.log("chat error", error);
      setChats([]);
    }
  };

  const value = useMemo(() => {
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
    };
  }, [
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
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);