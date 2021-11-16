const mongoose=require("mongoose")
const config =require("config")
const db=config.get("mongURI")
const connectDB=async()=>{
    try{
        await mongoose.connect(db)

    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
};
module.export=connectDB