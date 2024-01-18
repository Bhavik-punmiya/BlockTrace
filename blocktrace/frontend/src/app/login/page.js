'use client'

import React, { useState } from 'react'
import Head from "next/head";
import Link from "next/link";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';

import { useAuth } from '../context/auth'

function page() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[auth,setAuth]=useAuth()
  
  const navigate = useRouter();;
  const handleSubmit=async()=>{
    try{
      const body={
        "email":email,
        "password":password}
      
   const res = await axios.post("http://localhost:8080/v1/auth/login",body);
   console.log(res);
    if(res.data.success){
      
      toast.success(res.data.message);
      setAuth({...auth,user:res.data.user})
      console.log(auth);
      localStorage.setItem("auth",JSON.stringify(res.data));
      navigate.push(`/${res.data.user.role}`);
    }
    else{
      toast.error(res.data.message);
    }
   
    }catch(err){
     console.log("Login data can't be send to api",err)
    }
    
  }
  return (
    <div>
        <Toaster
       position="top-center"
       reverseOrder={false}
         />     
       <>
      <Head>
        <meta name='robots' content='index' />
        <title>Login - BlackTrace</title>
      </Head>

      <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-600'>
          <div className='text-center'>
           
            <div className='mt-5 space-y-2'>
              <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
                Log in to your account
              </h1>
              <p>
                Don't have an account?{" "}
                <Link
                  href='/signup'
                  className='font-medium text-blue-600 hover:text-blue-500'>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={(e) => (e.preventDefault())} className='mt-8 space-y-5'>
            <div>
              <label className='font-medium'>Email</label>
              <input
                type='email'
                required
                value={email}
              onChange={(e)=>setEmail(e.target.value)} 
                className='w-full mt-3 focus:border-blue-600 px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            <div>
              <label className='font-medium'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
                required
                className=' mt-3 focus:border-blue-600 w-full px-3 py-2 bg-white text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg duration-150'
              />
            </div>
            <button
              type='submit'
              onClick={handleSubmit}
              className='w-full text-white bg-blue-600 py-2 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg'>
              Log In
            </button>
            <div className='text-center'>
              <Link href='/password/reset' className='hover:text-blue-600'>
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
