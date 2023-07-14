import { connect } from "@/dbConfig/dbCongifg";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest){
  try {

    // getting the user details from token recieved
    const reqBody=await request.json();
    const {password,token}=reqBody;
    const user=await User.findOne({forgetPasswordToken:token, forgotPasswordTokenExpiry:{$gt: Date.now()}})

    if(!user){
      return NextResponse.json({
        message:"Invalid Token"
      })
    }

    if(!password) {
      return NextResponse.json({error: "Invalid password"}, {status: 400})
  }
    // encrypting the password
    const salt=await bcryptjs.genSalt(10)
    const hashedPassword=await bcryptjs.hash (password,salt)

    // updating the password in database
    user.password=hashedPassword
    user.forgetPasswordToken=undefined
    user.forgotPasswordTokenExpiry=undefined
    await user.save()

    return NextResponse.json({
      message: "Password reset successfully",
      success: true
  })
  } catch (error:any) {
    return NextResponse.json({
      error:error.message
    })
  }
}