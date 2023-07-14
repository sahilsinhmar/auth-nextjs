'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage(){

  const router=useRouter();
  const [user, setUser]=React.useState({
    email:"",
    password:"",
  })

  const [buttonDisabled, setButtonDisabled]=React.useState(false);
  const [loading, setLoading]=React.useState(false)
  const[userexist,setUserExist]=useState("")

  const onLogin=async ()=>{
    try {
      setLoading(true);
    const response=await axios.post("/api/users/login",user)
    console.log("Login success", response.data);
    toast.success("Login success");
    setUserExist("success")
    router.push("/profile")
      
    } catch (error:any) {
      console.log("login failed", error.message)
      setUserExist("Wrong email or password")
      toast.error(error.message);
      
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(user.email.length >0 && user.password.length> 0){
      setButtonDisabled(false)
  }else{
    setButtonDisabled(true)
  }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col border p-10 bg-[#EBEBF3] text-blue-950 rounded-xl shadow-lg ">
      <h1 className="text-4xl font-bold font-sans mb-4">{loading ? "Processing" : "Login"}</h1>
       <label htmlFor="email">Email</label>
      <input id="email" type="text" value={user.email} onChange={(e)=>{
        setUser({...user,email:e.target.value})
      }} placeholder="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" ></input>

       <label htmlFor="password">Password</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="password" type="password" value={user.password} onChange={(e)=>{
        setUser({...user,password:e.target.value})
      }} placeholder="password"></input>

      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-[#4450BC] text-white text-xl" onClick={onLogin}>{buttonDisabled ? "..." : "Login"}</button>
      <div className="text-red-700 text-center">{userexist}</div>
      <div className="text-md my-2 text-gray-500 text-center">Dont have an account?<Link href="/signup" className="mx-2 text-black">Signup</Link></div>
      
      <div className="text-center text-black">
        <Link href="/forgetpassword">Forgot your password?</Link>
      </div>
      </div>
    </div>
  )
}