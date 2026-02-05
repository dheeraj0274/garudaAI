
export const formateGemini= (messages)=>{

    return messages.map(msg=>({
        role:msg.role,
        parts:[{text:msg.text}]
    }))

}