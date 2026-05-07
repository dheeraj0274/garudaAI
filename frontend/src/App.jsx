import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router , Routes ,Route , useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import  Home  from './pages/Home.jsx'
import './index.css'
import {SidebarProvider } from './components/ui/sidebar.js'
import Login from './components/Login.jsx'
import { AuthProvider } from './context/authContext.jsx'
import ESidebar from './components/ESidebar.jsx'
import Chat from './pages/Chat.jsx'
import About from './components/About.jsx'
import Support from './components/Support.jsx'
import { SettingProvider } from './context/settingContext.jsx'

import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AuthSuccess from './utils/AuthSuccess.jsx';




function AppLayout(){
   const location = useLocation();


  const hideLayout = location.pathname ==='/auth-success';




  return <>

  {!hideLayout&& <Navbar/>}
        <Login/>
      <div className='min-h-screen flex flex-col' >
        
       
         <SidebarProvider >
          {!hideLayout && <ESidebar/>}
          <div className='font-semibold  '>
               <ToastContainer position='top-center'  />

          </div>
       
          
<Routes>
 
      <Route path="/" element={<Home/>}/>
       <Route path="/chat" element={<Chat/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path='/support' element={<Support/>} />
       <Route path='/auth-success' element={<AuthSuccess/>} />
 
         

      </Routes>
         


         </SidebarProvider>
      
      </div>
  </>

}
function App() {


 



 

  return (
    <Router>
      <AuthProvider>
        <SettingProvider>

       
        <AppLayout/>
      
       
       </SettingProvider>
     </AuthProvider>
   
    </Router>
   
  )
}

export default App
