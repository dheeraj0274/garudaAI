import redisClient from "../config/redis";

const getChatKey = (chatId)=> `chat:${chatId}:messages`;


export const getCachedMessages = async(chatId)=>{
    const key = getChatKey(chatId);


    const messages = await redisClient.get(key);

    if(!messages){
        return null;
    }

    return JSON.parse(messages);
}

export const  setCachedMessages = async(chatId  , messagges)=>{

    const key = getChatKey(chatId);
     await redisClient.set(
        key,
        JSON.stringify(messages),{
            EX:3600
        }
     )

}

export const deleteCachedMessages =async (chatId)=>{



    const key = getChatKey(chatId);

    await redisClient.del(key);
}