import mongoose from "mongoose";

 export async function connect(){
  try{
    mongoose.connect(process.env.MONGO_URL!)
    const connection=mongoose.connection;

    connection.on('connected', ()=>{
      console.log('mongo db is connected')
    })

    connection.on('error',(err)=>{
      console.log("Mongo DB connection error. Please make sure mongodb is running." + err);
      process.exit();
    })

  }catch (error){
    console.log('something goes wrong')
    console.log(error)
  }
 }