import { createContext , useContext , useState } from "react";


const SettingContext = createContext();
const colorData=[
        {
            name:'Default',
            value:"bg-zinc-500"
        },
         {
            name:'green',
            value:" bg-green-500"
        },
        {
            name:'yellow',
            value:"bg-yellow-500"
        },
        {
            name:'pink',
            value:" bg-pink-500"
        },
        {
            name:'purple',
            value:" bg-purple-500"
        },

    ]

export const SettingProvider = ({children})=>{
      const [generalSetting , setGeneralSettings] = useState({
          theme:'Dark',
          contrast:'System',
          accColor:{
            name:'default',
            value:colorData[0].value
          }
        })



         const [notification ,setNotification]=useState({
         push:true,
         email:false,
         u_push:true,
         u_email:false
     })
     

    return  (
        <SettingContext.Provider
        
        value={{
            generalSetting,
            setGeneralSettings,
            notification,
            setNotification,
            colorData
        }}
        >
            
            {children}
            
        </SettingContext.Provider>
    )

}


export const useSetting = ()=> useContext(SettingContext)