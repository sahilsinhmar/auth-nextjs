"use client"
import Link from "next/link"
import React, {useState,useEffect} from "react"
import axios from "axios"


export default function ResetPasswordPage(){
  const [password,setPassword]=useState("")
  const [token,setToken]=useState("")
  const [error,setError]=useState("")

  useEffect(()=>{
    const urlToken=window.location.search.split("=")[1]
    setToken(urlToken)
  },[])

  const changePassword=async()=>{
    try {
      const response=await axios.post("/api/users/resetpassword" ,{password,token})
      const responseData=response.data;
      setError(`${responseData.error||responseData.message}`)
      
    } catch (error:any) {
      throw new Error("Invalid Token")
    }finally{
      setPassword("")
    }
  }
  return(
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className="flex flex-col border p-10 bg-[#EBEBF3] text-blue-950 rounded-xl shadow-lg items-center ">
      <div>
       <label htmlFor="email" className='text-xl m-6'>Enter your new password</label>
      <input id="password" type="password" value={password} onChange={(e)=>{
        setPassword(e.target.value)
      }} placeholder="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" ></input>
      </div>
      <button type='submit' className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-[#4450BC] text-white text-xl" onClick={changePassword}>Submit</button>
      <div>
        <div>{error}</div>
        <p className="mt-4 flex gap-4 text-md">Now you can<Link className="text-black font-bold" href="/login">Login</Link></p>
      </div>
      </div>
      </div>
  )

}