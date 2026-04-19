import { IoClose } from "react-icons/io5";
import {Button} from '../components/ui/button'

import { IoIosSettings ,
         IoIosNotificationsOutline ,
         
        
        
        
         IoMdAddCircleOutline 
  } from "react-icons/io";
  import { BsDatabaseFillGear } from "react-icons/bs";
  import { FaFaceGrin } from "react-icons/fa6";
  import { IoKey } from "react-icons/io5";
  import { IoNotificationsSharp } from "react-icons/io5";


    import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {General , Notification ,DataControl, Personalization,Security,Account} from '../utils/settingUI'
import { useState } from "react";




const setting_icons=[
  {
    title:'General',
    icon:<IoIosSettings size={15}/>

  },
    {
    title:'Notification',
    icon:<IoNotificationsSharp size={15}/>

  },
    {
    title:'Personalization',
    icon:<FaFaceGrin size={15}/>

  },
     {
    title:'Data Control',
    icon:<BsDatabaseFillGear size={15}/>

  },
    {
    title:'Security',
    icon:<IoKey size={15}/>

  },
    {
    title:'Account',
    icon:<IoMdAddCircleOutline size={15}/>

  },
  

]


const Settings = ({ close }) => {

  const [activeTab,setActiveTab]=useState('')


  const handleClick=(e)=>{
      setActiveTab(e)


  }

  const renderContent=()=>{
          switch(activeTab){
            case 'General':
              return <General/>
              break;
            case 'Notification':
                return <Notification/>
                break;
                 case 'Personalization':
                return <Personalization/>
                break;
                 case 'Data Control':
                return <DataControl/>
                break;
                 case 'Security':
                return <Security/>
                break;
                 case 'Account':
                return <Account/>
                break;


            default: break;
          }
  }
  return (
    <>
     
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={close}
      />

     
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        
        <div className=" text-white w-[85%] md:w-[70%]  md:h-[60%] h-[45%]  rounded-2xl   relative">
          <div className="flex w-full h-full  ">

          {/* left-setting-container */}

             <div className="bg-gray-900 w-[31%] rounded-l-xl p-2 md:p-3   ">
              <div className=" hover:bg-gray-500 cursor-pointer max-w-fit rounded-[2px] ">
                  <IoClose  onClick={close} size={20} />
              </div>


              {/* sidebar */}
              <div className="flex flex-col gap-2 md:mt-11 mt-5">
                {
                  setting_icons.map((item)=>(
                   

                    <div
                       onClick={()=>handleClick(item?.title)}
                    className="flex  items-center pl-[.3rem] gap-2 md:p-2 hover:bg-gray-700 rounded-xl cursor-pointer">
                      <span>{item?.icon}</span>
                      <span className="  max-[550px]:text-[9px] max-[760px]:font-light  md:text-[13px]">{item?.title}</span>


                      </div>
                     

                  ))
                }
              </div>
             
              

             </div>


         {/* right setting container */}
          <div className="bg-zinc-800 w-[70%] rounded-r-xl">
            {renderContent()}

          </div>
        </div>

       
         

        </div>

      </div>
    </>
  )
}

export default Settings