import {Children, createContext , useContext , useState} from 'react'


const AuthContext = createContext()



export const AuthProvider=({children})=>{

    const [showLogin , setShowLogin] = useState(false)

    const openLogin= ()=>(setShowLogin(true))
    const closeLogin = ()=>(setShowLogin(false))


    return(
        <AuthContext.Provider value={{showLogin , openLogin , closeLogin}}>
            {children}
        </AuthContext.Provider>
    )


}

export const  useAuth = ()=> useContext(AuthContext) 