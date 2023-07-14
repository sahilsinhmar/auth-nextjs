"use client"
import axios from "axios"
import Link from "next/link"
import React,{useState,useEffect} from "react"

export default function VeriyEmailPage(){
  const [token,setToken]=useState("")
  const [verified, setVerified]=useState(false)
  const [error,setError]=useState(false)

  const verifyUser=async()=>{
    try {
      await axios.post("/api/users/verifyemail",{token})
      setVerified(true)
    } catch (error:any) {
      setError(true)
      console.log(error.response.data)
    }
  }

  useEffect(()=>{
    const urlToken=window.location.search.split("=")[1]
    setToken(urlToken || "")
  },[]);

  useEffect(()=>{
    if(token.length>0){
      verifyUser()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  return(
    <div>
      <h1>Verify email</h1>
      <h2>{token ? `${token}`:"no token"}</h2>
      {verified && (
        <div>
          <h1>email verified</h1>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>Error</div>
      )}
    </div>
  )
}