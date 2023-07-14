"use client"
import Link from "next/link";
import React ,{useEffect} from "react"
import { useRouter } from "next/navigation";
import axios  from "axios";

export default function SignUpPage(){

  const router=useRouter();
  
  const [user, setUser]=React.useState({
    email:"",
    password:"",
    username:"",
  })
  const [buttonDisabled, setButtonDisabled]=React.useState(false);
  const [loading, setLoading]=React.useState(false)

  const onSignup=async ()=>{
    try{
      setLoading(true)
      const response=await axios.post("/api/users/signup",user);
      console.log("signup success", response.data)
      router.push("/login")
    }catch(error:any){
      console.log("sign up is failed", error.message)

    }finally{
      setLoading(false)

    }

  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <div className="flex flex-col border p-10 bg-[#EBEBF3] text-blue-950 rounded-xl shadow-lg ">
      <h1 className="text-4xl font-bold font-sans mb-4">{loading ? "Processing" : "Signup"}</h1>
      <hr/>
      <label htmlFor="username">username</label>
      <input id="username" type="text" value={user.username} onChange={(e)=>{
        setUser({...user,username:e.target.value})
      }} placeholder="username" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" ></input>

       <label htmlFor="email">email</label>
      <input id="email" type="text" value={user.email} onChange={(e)=>{
        setUser({...user,email:e.target.value})
      }} placeholder="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" ></input>

       <label htmlFor="password">password</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="password" type="password" value={user.password} onChange={(e)=>{
        setUser({...user,password:e.target.value})
      }} placeholder="password"></input>

      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-[#4450BC] text-white text-xl" onClick={onSignup}>{buttonDisabled ? "..." : "signup"}</button>
      <div className="text-gray-400">Already have an account? <Link href="/login" className="text-black">Login</Link></div>
      
      </div>
    </div>
  )
}