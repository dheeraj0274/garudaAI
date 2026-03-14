import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);


  const [chats,setChats]=useState([]);
  const [currentchatId , setCurrentchatId] = useState(null)
   const [messages, setMessages] = useState([
    { role: "model", text: "Hi, I am Garuda!" },
  ]);

 
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        { withCredentials: true }
      );
    
      

      setUserDetails(res.data.User);
      setLoggedIn(true);
    } catch (err) {
      setLoggedIn(false);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
   
  }, []);

console.log(userDetails);
const loadAllChats= async()=>{
try {
  const res = await axios.post('http://localhost:5000/chat/allchat', {},{withCredentials:true} );
   

  const data= res.data.allChats;
  console.log('data',data)
  
  setChats(data)
} catch (error) {
  console.log('error',error)
  setChats(null)
  
}

  




}


  return (
    <AuthContext.Provider
      value={{
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
        loadAllChats
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
