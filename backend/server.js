import dotenv from 'dotenv'


dotenv.config(
    {path:  process.env.NODE_ENV==='production' ? "./config/.env.production" : "./config/.env.development"}
)
import app from "./app.js";
import mongoose from 'mongoose'



const db = async()=>{
    
try {
    mongoose.connect(process.env.MONGO_URI);

   console.log('Mongodb connected');
   
} catch (error) {
    console.log('error',error);
    
    
}


}
db();



const mode = process.env.NODE_ENV==='production' ? 'production' : 'local'

const PORT = process.env.Port || 8000;

app.listen(PORT , (req,res)=>{
    console.log(`Server is running on the ${PORT} on ${mode}`);
    
})


