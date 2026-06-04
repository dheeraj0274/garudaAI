import axios from "axios";
import { createContext , useContext , useEffect, useState } from "react";


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
     const[loaded,setLoaded] = useState(false)
  


  

        useEffect(()=>{

            const fetchsetting= async()=>{
                try {
                     const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getSetting` , {withCredentials:true})
                     const notification = res.data.notification;
                    
                     const setting = res.data.generalSetting;

                     console.log('get',{setting,  notification})


                     setGeneralSettings(setting);
                     setNotification(notification)
                     setLoaded(true)

                     
                } catch (error) {
                    console.log(error)
                    
                }


            }
            fetchsetting();
           
        },[])

        useEffect(()=>{
            if(!loaded) return;

           

            const updateSetting = async()=>{
                 try {
                   const res=  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/setting` , {settings:{generalSetting,notification}} , {withCredentials:true})
                   console.log('changed',res.data)

                //    setNotification(res.data.setting.generalsettings.notifications);
                //    setGeneralSettings(res.data.setting.generalsettings)
            } catch (error) {
                console.log(error)

                
            }
               
            }
            updateSetting()

        } , [notification , generalSetting])


     

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