"use client"
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'


export default function ForgerPassword(){
  const router=useRouter()
  const [email, setEmail]=useState("")
  const [linkset, setLinkSet]=useState("")

  const sendLink=async()=>{
    try {
      const response=await axios.post("/api/users/forgetpassword",{email})
      const responseData=(response.data)
      setEmail("");
      setLinkSet(`${response.data.error || response.data.message}`)
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
  return(
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className="flex flex-col border p-10 bg-[#EBEBF3] text-blue-950 rounded-xl shadow-lg ">
      <div className='flex flex-col'>
       <label htmlFor="email" className='text-xl m-6 text-center'>Enter your email</label>
      <input id="email" type="text" value={email} onChange={(e)=>{
        setEmail(e.target.value)
      }} placeholder="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" ></input>
      </div>
      <button type='submit' className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-[#4450BC] text-white text-xl" onClick={sendLink}>Submit</button>
      <div>{linkset}</div>
      </div>
    </div>

  )
}