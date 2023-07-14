import { connect } from "@/dbConfig/dbCongifg";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest){
  try {
    const reqBody=await request.json()
    const {email}=reqBody;

    // getting the user details by email
    const user=await User.findOne({email})

    if(!user){
      return NextResponse.json({
        error:"User doesn not exist, Check your Email or create a new account"
      })
    }

    // sending the reset password mail
    await sendEmail({email, emailType: "RESET", userId: user._id.toString()});

    return NextResponse.json({message: "Check your inbox to reset the password"})

  } catch (error:any) {
    return NextResponse.json({
      error:error.message
    })
    
  }
}