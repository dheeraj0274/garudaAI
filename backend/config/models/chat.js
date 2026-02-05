
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
        Default:Date.now()
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
        Default:"New chat",

    },
    messages:[messageSchema],

    isArchieved:{
        type:Boolean,
        Default:false

    }

} , {timestamps:true})


export default mongoose.model('chat', chatSchema);