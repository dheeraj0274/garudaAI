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




const setting_icons=[
  {
    title:'General',
    icon:<IoIosSettings/>

  },
    {
    title:'Notification',
    icon:<IoNotificationsSharp/>

  },
    {
    title:'Personalization',
    icon:<FaFaceGrin/>

  },
     {
    title:'Data Control',
    icon:<BsDatabaseFillGear/>

  },
    {
    title:'Security',
    icon:<IoKey/>

  },
    {
    title:'Account',
    icon:<IoMdAddCircleOutline/>

  },
  

]


const Settings = ({ close }) => {
  return (
    <>
     
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={close}
      />

     
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        
        <div className=" text-white w-[80%] md:w-[50%]  h-[60%]  rounded-2xl   relative">
          <div className="flex w-full h-full  ">

          {/* Right-setting-container */}

             <div className="bg-gray-800 w-[30%] rounded-l-xl p-3 ">
              <div className=" hover:bg-gray-500 cursor-pointer max-w-fit rounded-[2px] ">
                  <IoClose  onClick={close} size={22} />
              </div>



              {/* sidebar */}
              <div className="flex flex-col gap-2 mt-11">
                {
                  setting_icons.map((item)=>(
                   

                    <div className="flex  items-center gap-2 p-2 hover:bg-gray-700 rounded-xl cursor-pointer">
                      <span>{item?.icon}</span>
                      <span className="text-[13px]">{item?.title}</span>


                      </div>
                     

                  ))
                }
              </div>
             
              

             </div>


         {/* left setting container */}
          <div className="bg-zinc-700 w-[70%] rounded-r-xl">

          </div>
        </div>

       
         

        </div>

      </div>
    </>
  )
}

export default Settings