import { useState } from 'react'

import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom'
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
function App() {
 

  return (
    <Router>
      <AuthProvider>

      
        <Navbar/>
        <Login/>
      <div className='min-h-screen flex flex-col' >
        
       
         <SidebarProvider >
          <ESidebar/>
          
<Routes>
 
      <Route path="/" Component={Home}/>
       <Route path="/chat" Component={Chat}/>
       <Route path="/about" Component={About}/>
       <Route path='/support' Component={Support} />
 
         

      </Routes>
         


         </SidebarProvider>
      
      </div>
     </AuthProvider>
   
    </Router>
   
  )
}

export default App
