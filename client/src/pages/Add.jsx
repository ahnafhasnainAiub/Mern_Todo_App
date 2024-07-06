import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';

function Add() {

  const URL = "http://localhost:8000/tasks";

   //Context API for Local Storage
   const {authData} = useAuth();  
  
   //navigate
  const navigate = useNavigate()

const users = {
  title: "",
  describe:"",
}

const [user, setUser] = useState(users);


const inputHandler = (e) => {
  console.log(e);
  let name = e.target.name;
  let value = e.target.value;

  setUser({
    ...user,
    [name]: value,
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    //Connecting Frontend with Backend
 try{
    const response = await fetch(URL,{
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Authorization":"Bearer "+authData?.token
     },
     
     body: JSON.stringify({...user,user:authData?._id}),

    });
   
    if(response.ok){

     const res_data = await response.json();
     console.log("Res from server", res_data);

     //Stored the token in Localhost
    //  storetokenInLS(res_data.token);

     setUser({ title: "", describe: ""});
     navigate("/dashboard");
    
   } else {
     console.log("Submit failed", response.statusText);
   }

    console.log(response);

  }catch(error){
     console.log("Submit issue", error);
 }
};



  return (
    <div className='container'>
       <div className='my-8'>
       <Link className=' bg-black text-white rounded-xl py-[6px] ml-6 px-3' to={"/dashboard"}>Back</Link>
       </div>
        
        
        <form  onSubmit={handleSubmit} className='bg-slate-200 md:w-[800px]'>
            <div className='text-2xl font-bold text-center mt-8'>Task Form</div>
              <div className="mx-4">
                <div className="flex flex-col">
                  <label htmlFor="title" className="mt-4">
                    Enter Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="my-4 py-[10px] px-4 rounded-lg "
                    id="title"
                    placeholder="Enter Task Title Please"
                    required
                    autoComplete="off"
                    onChange={inputHandler}
                    value={user.title}
                  />
                </div>

                <div className="flex flex-col md:w-full ">
                  <label htmlFor="describe" className="mt-4">
                    Enter Description
                  </label>
                  <input
                    type="text"
                    name="describe"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="describe"
                    placeholder="Enter Task Describe "
                    required
                    autoComplete="off"
                    onChange={inputHandler}
                    value={user.describe}
                    
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-black text-white rounded-lg py-3 px-4  ml-5 mb-5"
              >
                Submit Task
              </button>
            </form>
    </div>
  )
}

export default Add