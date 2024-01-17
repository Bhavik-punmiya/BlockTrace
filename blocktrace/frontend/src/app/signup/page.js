'use client'

import React, { useState } from 'react'
import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';

function page() {

    const [name,setName]=useState()
    const [role,setRole]=useState()
 
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate = useRouter();
    const handleSubmit=async()=>{
        try{
           const res = await axios.post("/v1/auth/register",{name,email,password,role});
         
           if(res.data.success){
            toast.success("Registered Successfully");
            navigate.push('/login');
           }
           else{
            toast.error(res.data.message);
           }
           console.log(res);

        }
        catch(err){
            console.log("data can't send to api",err)
        }

    }




  return (
    <div>
       <>
      <Head>
        <meta name='robots' content='index' />
        <title>Sign Up - BlackTrace</title>
      </Head>

      <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-600'>
          <div className='text-center'>
           
            <div className='mt-5 space-y-2'>
              <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
                Register your account
              </h1>
              <p>
                have an account?{" "}
                <Link
                  href='/login'
                  className='font-medium text-blue-600 hover:text-blue-500'>
                  Log In
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={(e) =>(  e.preventDefault())} className='mt-8 space-y-5'>
          <div>
              <label className='font-medium'>Name</label>
              <input
                type='text'
                required
                value={name}
                onChange={(e)=>setName(e.target.value)} 

                className='w-full mt-3 focus:border-blue-600 px-3 py-2 bg-white text-gray-600 bg-transparent outline-none border shadow-md rounded-lg duration-150'
              />
            </div>
            <div>
              <label className='font-medium'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e)=>setPassword(e.target.value)} 
                required
                className='w-full mt-3 focus:border-blue-600 px-3 py-2 bg-white text-gray-600 bg-transparent outline-none border shadow-md rounded-lg duration-150'
              />
            </div>
            <div>
              <label className='font-medium'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                required
                className=' mt-3 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-600 bg-transparent outline-none border shadow-md rounded-lg duration-150'
              />
            </div>
            <div>
              <label className='font-medium'>Role</label>
              <input
                type='text'
                value={role}
                onChange={(e)=>setRole(e.target.value)} 
                required
                className=' mt-3 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-600 bg-transparent outline-none border shadow-md rounded-lg duration-150'
              />
            </div>
            <button
              type='submit'
              onClick={handleSubmit}
              className='w-full text-white bg-blue-600 py-2 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg'>
              Register
            </button>
            <div className='text-center'>
              <Link href='/' className='hover:text-blue-600'>
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
    </div>
      
    
  )
}

export default page
