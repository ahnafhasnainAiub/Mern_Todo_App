import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Navbar() {
 
  const {authData} = useAuth();
  
 
  return (
   
    <header className=" bg-slate-200">
    
    <nav className="p-5 md:flex md:items-center md:justify-between md:container md:mx-auto">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-[Poppins] cursor-pointer">
          <p className='font-extrabold'>Let's To-Do</p>
        </span>

        <span className="text-3xl cursor-pointer mx-2 md:hidden block">
          <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
        </span>
      </div>
    
      <ul
        className="md:font-medium md:flex md:items-center z-[1] md:z-auto md:static absolute bg-slate-200 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-490"
      >
        <li className="mx-4 my-5 md:my-0 text-xl hover:text-cyan-500 duration-400">
          <NavLink to="/" className=""
            >HOME</NavLink
          >
        </li>
        <li className="mx-4 my-5 md:my-0 text-xl hover:text-cyan-500 duration-400">
          <NavLink to="/about" className=""
            >ABOUT</NavLink
          >
        </li>
        <li className="mx-4 my-5 md:my-0 text-xl hover:text-cyan-500 duration-400">
          <NavLink to="/contact" className=""
            >CONTACT</NavLink
          >
        </li>


         {authData?._id ? <li className="mx-4 my-5 md:my-0 text-xl hover:text-cyan-500 duration-400">
          <NavLink to="/logout" className=""
            >LOGOUT</NavLink
          >
        </li> : <>
         
        <li className="mx-4 my-5 md:my-0 text-xl hover:text-cyan-500 duration-400">
          <NavLink to="/login" className=""
            >LOGIN</NavLink
          >
        </li>
        <li className="mx-4 my-5 md:my-0 text-xl hover:text-cyan-500 duration-400">
          <NavLink to="/registration" className=""
            >SIGNUP</NavLink
          >
        </li>
          
        </> }

        
        
       
      </ul>
    </nav>

  </header>

)
}

export default Navbar