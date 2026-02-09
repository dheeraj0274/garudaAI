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
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
