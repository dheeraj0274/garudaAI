import express from 'express'
import authRoutes from './Routes/authRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'
const app = express();


app.use(express.json());


app.get('/',(req,res)=>{
    res.send('hi');
})

app.use('/chat',chatRoutes)
app.use('/api/auth',authRoutes);







export default app;