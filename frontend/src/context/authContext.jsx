import {Children, createContext , useContext , useState} from 'react'


const AuthContext = createContext()



export const AuthProvider=({children})=>{

    const [showLogin , setShowLogin] = useState(false);
    const [showReg , setShowReg]=useState(false);
    const [isLoggedIn ,setLoggedIn]=useState(false);
    const [loading ,setLoading]=useState(false)

    const openLogin= ()=>(setShowLogin(true))
    const closeLogin = ()=>(setShowLogin(false))



    return(
        <AuthContext.Provider value={{showLogin , openLogin , closeLogin ,
         showReg,setShowReg , loading ,setLoading}}>
            {children}
        </AuthContext.Provider>
    )


}

export const  useAuth = ()=> useContext(AuthContext) 