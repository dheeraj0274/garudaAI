
import mongoose from 'mongoose';



const messageSchema= new mongoose.Schema({
    role:{
        type:String,
        enum:["user","model", "system"],
        required:true

    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const chatSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        default:"New chat",

    },
    messages:[messageSchema],

    isArchieved:{
        type:Boolean,
        default:false

    }

} , {timestamps:true})


export default mongoose.model('chat', chatSchema);