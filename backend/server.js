import dotenv from 'dotenv'
import app from "./app.js";


dotenv.config({path:"./config/.env"})




const PORT = process.env.Port || 8000;

app.listen(PORT , (req,res)=>{
    console.log(`Server is srunning on the ${PORT}`);
    
})

