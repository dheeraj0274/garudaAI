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
import { FaGoogle } from "react-icons/fa";
import { DiBingSmall } from "react-icons/di";
import { GrFormClose } from "react-icons/gr";

import logo from "../assets/LogoCrop.jpeg";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import Register from "./Register";
import axios from "axios";

const Login = () => {
  const { closeLogin } = useAuth();
  const { showLogin  , isLoggedIn ,setLoggedIn} = useAuth();
  const { showReg, setShowReg } = useAuth();
  const {loading  ,setLoading}=useAuth();

  const {setUserDetails}=useAuth();

   const [form ,setForm]=useState({
      name:'',
   
      password:''
    })



  const userLogin=async()=>{

    

    if(!form.email ||!form.password){
      alert('Enter all value')
    }

    try {
      setLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login` , {
        email:form.email,
        password:form.password
      } , {withCredentials:true});

    if(res.data.success){
      alert(res.data.message);
      console.log('user',res.data);
      
      setUserDetails(res.data.user);
      setLoggedIn(true);
    }
    } catch (error) {
            if (error.response?.status === 409) {
    alert(error.response.data.message);
  }  else {
    alert('Server not reachable or network error');
    console.error(error);
  }
      
    }
    finally{
      setLoading(false)
      closeLogin()
    }

    
  }
const googleLogin = () => {
 window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google?prompt=select_account`;
};

  if (!showLogin) return null;




  return (
    <>
      {showReg ? (
        <Register/>
       
      ) : (
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

                <CardTitle className="text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-400 text-[11px]">
                  Please enters your details to login{" "}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div>
                    <label
                      className="text-zinc-300 text-[13px]"
            
                    >
                      Email Address
                    </label>
                    <Input
                    value={form.email}
                    onChange={(e)=>setForm({...form , email:e.target.value})}
                      className="h-5 border border-dashed border-gray-500
             text-[11px] text-zinc-300
             focus:!border-none focus:!outline-none
             focus:!ring-0 focus:!ring-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-300 text-[13px]">
                      Email Password
                    </label>
                    <Input
                    value={form.password}
                    onChange={(e)=>setForm({...form , password:e.target.value})}
                      className="h-5 border-dashed border-gray-500 text-[10px] text-zinc-300
                focus:!border-none    focus:!outline-none focus:!ring-0"
  
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                onClick={userLogin}
                 className="bg-green-600 w-full h-7 text-white">
                  {loading ? 'Logging...' : 'Login'}
                </Button>

                <div className="flex flex-col w-full">
                  <div className=" flex  w-full h-full items-center justify-center gap-1 mt-3">
                    <span className="block h-px bg-gray-400 w-full"></span>
                    <p className="text-white text-[13px]">or</p>
                    <span className="block h-px bg-gray-400 w-full"></span>
                  </div>

                  <div className="flex   justify-between mt-2 ">
                    <div
                    onClick={googleLogin}
                    className="bg-gray-500 rounded gap-1  w-23 flex justify-center items-center">
                      <FaGoogle size={20} color="red" />
                      <span className="text-white text-[10px] cursur-pointer">
                        with Google
                      </span>
                    </div>
                    <div className="bg-gray-500 rounded p-1 w-23 flex items-center justify-center">
                      <DiBingSmall size={30} color="purple" />
                      <span className="text-white text-[10px] cursur-pointer">with Bing</span>
                    </div>
                  </div>
                  <div className="flex items-center  gap-1 mt-7">
                    <p className="text-zinc-200 text-[12px]">
                      Don't have an account?
                    </p>
                    <button
                      onClick={()=> setShowReg(true)}
                      className="text-blue-400 text-[14px]"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
        
      )}
    </>
  );
};

export default Login;
