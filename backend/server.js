import dotenv from 'dotenv'
import app from "./app.js";
import mongoose from 'mongoose'



dotenv.config({path:"./config/.env"})


const db = async()=>{
    
try {
    mongoose.connect(process.env.MONGO_URI);

   console.log('Mongodb connected');
   
} catch (error) {
    console.log('error',error);
    
    
}


}
db();





const PORT = process.env.Port || 8000;

app.listen(PORT , (req,res)=>{
    console.log(`Server is srunning on the ${PORT}`);
    
})

