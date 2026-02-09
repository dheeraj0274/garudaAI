import express from 'express'
import authRoutes from './Routes/authRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'
import passport from 'passport'
import cookieParser from 'cookie-parser';
import configurePassport from './utils/passport.js';
import cors from 'cors'
const app = express();


app.use(express.json());
app.use(cookieParser());

configurePassport();

app.use(passport.initialize());

const coreOptions={
    origin:"http://localhost:5173",
    credentials:true
   
}

app.use(cors(coreOptions));

app.get('/',(req,res)=>{
    res.send('hi');
})

app.use('/chat',chatRoutes)
app.use('/api/auth',authRoutes);







export default app;