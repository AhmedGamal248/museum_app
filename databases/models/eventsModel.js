import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true,'the event titel used'],
        trim:true,
        require:true,
        minLength:[2,'too short event name']
    },
    description:{
        type:String,
        trim:true,
        require:true,
        minLength:[10,'too short event description'],
        maxLength:[500,'too long event description']
    },
    date:String,
    imgCover:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})


export const eventsModel = mongoose.model('event',schema)