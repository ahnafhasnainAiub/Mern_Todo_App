import React from 'react'
import { NavLink } from 'react-router-dom'

function Error() {
  return (
    <section className='md:container'>
      <div className='md:mt-11'>
         <h1 className='font-extrabold text-7xl text-center'>Error 404</h1>
         
         <div className='text-center mt-8 mb-11'>
           <NavLink className='bg-black rounded-lg text-white px-4 py-4' to="/">Return to Home Page</NavLink>
         </div>
         
      </div> 
    </section>
  )
}

export default Error