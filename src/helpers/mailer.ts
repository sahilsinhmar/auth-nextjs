
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"

export const sendEmail=async({email, userId, emailType}:any)=>{
  try {
    const hashedToken=await bcryptjs.hash(userId.toString(),10)

    if(emailType==="VERIFY"){
      await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})
    }

    if(emailType==="RESET"){
      await User.findByIdAndUpdate(userId,{forgetPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7305d66d2e0339",
        pass: "752b20a8bdf702"
      }
    });

    const mailOptions={
      from:"sahil@gmail.com",
      to:email,
      subject: emailType==="VERIFY" ?"verify your email" :"reset your password",
      html:`<p>click <a href="${process.env.DOMAIN}/${emailType==="VERIFY"? "verifyemail":"resetpassword"}?token=${hashedToken}"> here</a>to ${emailType==="VERIFY"? "verify your email" :"reset your password"} or copy paste the below url in browser ${process.env.DOMAIN}/${emailType==="VERIFY"? "verifyemail":"resetpassword"}?token=${hashedToken}</p>`
    }

    const mailresponse=await transport.sendMail(mailOptions)

    return mailresponse
    
  } catch (error) {
    
  }

}