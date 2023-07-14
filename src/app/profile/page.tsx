'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

export default function ProfilePage(){
  const router=useRouter()
const [data,setData]=React.useState("nothing")

  const logout=async()=>{
    try {
      await axios.get("api/users/signout")
      router.push("/login")
    } catch (error) { 
    }
  }

  const getUser=async()=>{
    try {
      const response=await axios.get("/api/users/me")
      setData(response.data.data._id)
      
    } catch (error) {
      
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col border p-10 bg-[#EBEBF3] text-blue-950 rounded-xl shadow-lg w-[800px] h-[400px] items-center justify-around">
      <h1 className="text-4xl">Profile</h1>
      <div className="border border-black min-w-[400px] p-2 rounded-lg text-xl text-center">{data==="nothing" ? "..." :<Link href={`/profile/${data}`}>{data}</Link>}</div>
      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-[#4450BC] text-white text-xl" onClick={getUser}>get id</button>
      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-[#4450BC] text-white text-xl" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}