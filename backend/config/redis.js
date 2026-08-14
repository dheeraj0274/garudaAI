import {createClient} from 'redis';

const redisClient = createClient({
    url:process.env.REDIS_URL
})


redisClient.on("error",(err)=>{
    console.log("error");
})

redisClient.on("connect" , ()=>{
    console.log('redis connecting');
})


redisClient.on("ready" , ()=>{
    console.log("redis connected");
})

await redisClient.connect()

export default redisClient;
