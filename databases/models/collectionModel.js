import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true,'the collection name used'],
        trim:true,
        require:true,
        minLength:[2,'too short collection name']
    },
    description:{
        type:String,
        trim:true,
        require:true,
        minLength:[10,'too short collection description'],
        maxLength:[500,'too long collection description']
    },
    imgCover:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})


export const collectiontModel = mongoose.model('collection',schema)