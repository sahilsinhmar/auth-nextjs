import { connect } from "@/dbConfig/dbCongifg";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest){
  try {
    // getting the user details
    const reqBody=await request.json();
    const {token}=reqBody;
    const user=await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt: Date.now()}})

    if(!user){
      return NextResponse.json({
        error:"error.message"
      })
    }
    // updating the database to verify the user
    user.isVerified=true
    user.verifyToken=undefined
    user.verifyTokenExpiry=undefined
    await user.save()

    return NextResponse.redirect("/login")
    
  } catch (error:any) {
    return NextResponse.json({
      error:error.message
    })
  }
}