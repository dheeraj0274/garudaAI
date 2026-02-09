import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { GrFormClose } from "react-icons/gr";

import logo from "../assets/LogoCrop.jpeg";


import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";


import axios from 'axios'
import { useAuth } from "../context/authContext";
import { Rss, TypeIcon } from "lucide-react";

const Register = () => {
  const { closeLogin } = useAuth();
  const { showLogin } = useAuth();
  const { setShowReg } = useAuth();
  const [otp, setOtp] = useState(false);

  const {loading , setLoading , setLoggedIn}=useAuth();

  const[userOtp ,setUserOtp]=useState();
  const [form ,setForm]=useState({
    name:'',
    email:'',
    password:''
  })



  const sumbitUser = async () => {
    

    if(!form.name || !form.email || !form.password){
      alert('please enter all value');
      return
    }
    try {
      setLoading(true)
      
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sendOtp`, {
      name:form.name,
      email:form.email,
      password:form.password
     } , 
    {withCredentials:true}
  )

  if(res.data.success){
    console.log(res.data);
    alert(res.data.message);
     setOtp(true);
     setLoggedIn(true);
  }
      
    } catch (error) {
      alert(error.message||'otp-failed')
      
    }
    finally{
      setLoading(false)
    }
   
    
  };




  
  const submitOTP=async()=>{

    try {
      
    if(!userOtp.length==4){
      alert('please enter otp')
      return
    }
    setLoading(true)
    const res= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verifyandregister`,{
      name:form.name,
      email:form.email,
      password:form.password,
      userOTP:userOtp

    } , {
      withCredentials:true
    })

    if(res.data.success){
      alert(res.data.message)
    }




    setOtp(false);
    closeLogin()
      
    } catch (error) {
      alert(error.message)
      
    }
    finally{
      setLoading(false)
    }
    

  }

  return (
    <div className="fixed inset-0  bg-black/40 backdrop-blur-sm z-40">
      <div className="flex justify-center flex-col items-center h-full w-full">
        <Card className="w-65 h-110 bg-gray-800 outline-none border-none p-0">
          <CardHeader className="text-center ">
            <div className="flex justify-end items-center pt-4 h-1 cursor-pointer">
              <GrFormClose color="red" onClick={closeLogin} />
            </div>
            <div className="flex justify-center ">
              <img
                src={logo}
                className="w-[60px] rounded mix-blend-color-dodge"
              ></img>
            </div>

            <CardTitle className="text-white"></CardTitle>
            <CardDescription className="text-gray-400 text-[11px]">
              Please enters your details to Register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col ">
              <div>
                <label
                  className="text-zinc-300 text-[13px] 
            "
                >
                  Full Name
                </label>
                <Input 
                value={form.name}
                onChange={(e)=>setForm({...form , name:e.target.value})}
                  className="h-5 border border-dashed border-gray-500
             text-[11px] text-zinc-300
             focus:!border-none focus:!outline-none
             focus:!ring-0 focus:!ring-transparent"
                />
              </div>

              <div>
                <label className="text-zinc-300 text-[13px]">Email </label>
                <Input
                value={form.email}
                onChange={(e)=>setForm({...form , email:e.target.value})}
                  className="h-5 border-dashed border-gray-500 text-[10px] text-zinc-300
                focus:!border-none    focus:!outline-none focus:!ring-0
  "
                />
              </div>
               <div>
                <label className="text-zinc-300 text-[13px]">Password </label>
                <Input 
                value={form.password}
                onChange={(e)=>setForm({...form , password:e.target.value})}
                  className="h-5 border-dashed border-gray-500 text-[10px] text-zinc-300
                focus:!border-none    focus:!outline-none focus:!ring-0
  "
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
           

            <div className="flex flex-col w-full">
              <div className=" flex  w-full h-full items-center justify-center gap-1 ">
                {otp ? 
                <div className="flex flex-col items-center gap-2">
                
                  <InputOTP
                  value={userOtp}
                  onChange={(e)=>setUserOtp(e)} 
                  maxLength={4}>
                    <InputOTPGroup className='text-white gap-1'>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                  
                    
                    
                      <InputOTPSlot index={3} />
                        </InputOTPGroup>
                     
                    
                  </InputOTP>
                  <span className="text-gray-400 text-[12px]">Otp sent to the email</span>
                  </div>
                : null}
                 
              </div>
              <Button
              onClick={otp ? submitOTP : sumbitUser}
              className="bg-green-600 w-full h-7 mt-4 text-white cursor-pointer"
            >
              {loading ? 'please wait...': otp ? 'Sumbit OTP' : 'Register'}
            </Button>

              <div className="flex items-center justify-center  gap-1 mt-4">
                <p className="text-zinc-200 text-[12px]">
                  Alraedy have an account
                </p>
                <Link
                  onClick={() => setShowReg(false)}
                  className="text-blue-400 text-[13px]"
                >
                  Login
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
