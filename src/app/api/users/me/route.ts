import { connect } from "@/dbConfig/dbCongifg";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDatafromToken";


connect();

export async function GET(request:NextRequest){
  try {
    const userId=getDataFromToken(request);

    const user =await User.findOne({_id:userId}).
    select("-passwrod")
    
    return NextResponse.json({
      message:"user found",
      data:user
    })
  } catch (error:any) {
    NextResponse.json({
      error:error.message
    })
  }
}