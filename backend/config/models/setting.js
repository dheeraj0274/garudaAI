import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema({


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    appearence:{
        type:String,
        enum:['Dark' , 'Light' , 'System'],
        default:'System'



    },
    contrast:{
        type:String,
        enum:['System' , 'Medium' , 'High'],
        default:'System'
    },
    accColor:{
        type:String,
        enum:['Default' , 'Pink' ,'Green' , 'Purple','Yellow'],
        default:'Default'
    },
    
} , {timestamps:true})

const Setting = mongoose.model('Setting' , settingSchema)

export  default Setting;