import React, { useState } from 'react';
import hero from './../assets/hero.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth'; // Ensure this path is correct
import toast from "react-hot-toast";


function Registration() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth(); // Destructure storeTokenInLS from useAuth

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (data.data) {
        storeTokenInLS(data.token);
        storeTokenInLS(data.data._id, "_id");

        toast.success(data.message, { position: "top-right" });
        setUser({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        console.log("Registration failed", data);
      }
    } catch (error) {
      console.log("register issue", error);
    }
  };

  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="mt-5 mr-5  mb-7 ml-5 md:my-[120px] md:mr-6">
          <div className='md:ml-10 bg-slate-200 rounded-lg'>
            <div className='text-center font-extrabold text-4xl'>
              <h1 className='pt-8'>Registration Form</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mx-4'>
                <div className="flex flex-col md:w-full">
                  <label htmlFor="name" className="mt-4">Enter your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="name"
                    placeholder="Enter Your Full Name Please"
                    required
                    autoComplete="off"
                    value={user.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="flex flex-col md:w-full">
                  <label htmlFor="email" className="mt-4">Enter your Email</label>
                  <input
                    type="email"
                    name="email"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="email"
                    placeholder="Enter Your Email Please"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="flex flex-col md:w-full">
                  <label htmlFor="password" className="mt-4">Enter your Password</label>
                  <input
                    type="text"
                    name="password"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="password"
                    placeholder="Enter Your Password Please"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <button type='submit' className='bg-black text-white rounded-lg py-3 px-4 ml-5 mb-5'>Register Now</button>
            </form>
          </div>
        </div>
        <div className="mx-[20px] mt-[28px] mb-[52px] md:my-[120px] md:ml-6">
          <img src={hero} alt="hero Image" />
        </div>
      </div>
    </div>
  );
}

export default Registration;
