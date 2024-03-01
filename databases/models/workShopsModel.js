import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true,'the work Shop titel used'],
        trim:true,
        require:true,
        minLength:[2,'too short work Shop name']
    },
    description:{
        type:String,
        trim:true,
        require:true,
        minLength:[10,'too short work Shop description'],
        maxLength:[500,'too long work Shop description']
    },
    date:String,
    imgCover:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})


export const workShopModel = mongoose.model('workShop',schema)