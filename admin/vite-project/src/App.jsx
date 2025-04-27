import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendUrl = import.meta.env.VITE_BACKEND_URL;




export const currancy = '₹';


const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): ''  );

  useEffect(()=>{
   localStorage.setItem('token',token)
  },[token])
  
  
  return (

    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === ""
      ? <Login setToken={setToken}/>
    :<div>

    
        <Navbar setToken={setToken} />

        <hr />

        {/* Main Layout with Sidebar and Content */}
        <div className="flex w-full">
          <Sidebar />
          
          {/* Main content area */}
          <div className="text-base mx-auto w-[70%]">

          
            <Routes>
              <Route path="/add" element={<Add  token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Order token={token}  />} />  
            </Routes> 

          </div>
        </div>
      </div>
    }
      
    </div>
  );
};

export default App;
