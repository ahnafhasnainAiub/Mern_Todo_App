import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"

function Edit() {

 const users = {
  title: "",
  describe: "",
 }
 
 const navigate = useNavigate();

 const {id} = useParams();

 const [user, setUser] = useState(users);
  
 const inputChangeHandler = (e) => {
  console.log(e);
  let name = e.target.name;
  let value = e.target.value;

  setUser({
    ...user,
    [name]: value,
  });
  
 }

  useEffect(() => {
    axios.get(`http://localhost:8000/tasks/${id}`)
    .then((response) => {
      setUser(response.data);
      console.log(response);
    })
    .catch((error)=>{
       console.log(error);
    })
  }, [id])

 const submitForm = async (e) => {
  e.preventDefault();
  console.log(user);
 
  await axios.put(`http://localhost:8000/tasks/${id}`, user)
  .then((response)=> {
    toast.success(response.data.msg, {position: "top-right"})
    navigate("/dashboard")
  })
  .catch(error => console.log(error))


}


  return (
    <div className='container'>
    <div className='my-8'>
    <Link className=' bg-black text-white rounded-xl py-[6px] ml-6 px-3' to={"/dashboard"}>Back</Link>
    </div>
     
     
     <form onSubmit={submitForm} className='bg-slate-200 md:w-[800px]'>
         <div className='text-2xl font-bold text-center mt-8'>Task Update Form</div>
           <div className="mx-4">
             <div className="flex flex-col">
               <label htmlFor="title" className="mt-4">
                 Update Title
               </label>
               <input
                 type="text"
                 name="title"
                 className="my-4 py-[10px] px-4 rounded-lg "
                 id="title"
                 placeholder="Enter Task Title Please"
                 required
                 value={user.title}
                 onChange={inputChangeHandler}
                 autoComplete="off"
     
               />
             </div>

             <div className="flex flex-col md:w-full ">
               <label htmlFor="describe" className="mt-4">
                 Update Description
               </label>
               <input
                 type="text"
                 name="describe"
                 className="my-4 py-[10px] px-4 rounded-lg"
                 id="describe"
                 placeholder="Enter Task Describe "
                 required
                 value={user.describe}
                 onChange={inputChangeHandler}
                 autoComplete="off"
                 
               />
             </div>
           </div>

           <button
             type="submit"
             className="bg-black text-white rounded-lg py-3 px-4  ml-5 mb-5"
           >
             Update
           </button>
     </form>
 </div>
  )
}

export default Edit