import { connect } from "@/dbConfig/dbCongifg";
import User from "@/models/userModel"

import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
  try{
    const reqBody= await request.json()
    const {username,email,password}=reqBody

    console.log(reqBody)

    // checking if user exists or not 
    const user=await User.findOne({email})

    if(user){
      return NextResponse.json({error:"user already exists"}, {status:400})
    }

    // hashing the password
    const salt=await bcryptjs.genSalt(10)
    const hashedPassword=await bcryptjs.hash (password,salt)

    // making a new user data in database
   const newUser= new User({
      username,
      email,
      password:hashedPassword
    })

    // saving the user data in database
    const savedUser=await newUser.save();
    console.log(savedUser);

    // sending the email to verify the user with mail and token
    await sendEmail({email,userId:savedUser._id,emailType:"VERIFY"})
    return NextResponse.json({message:"user created succesfully",
    success:true,
   savedUser
  })
  }catch(error:any){
    return NextResponse.json({
      error:error.message},{status:500})
  }
}