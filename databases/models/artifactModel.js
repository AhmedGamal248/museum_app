import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true,'the product artifact used'],
        trim:true,
        require:true,
        minLength:[2,'too short artifact name']
    },
    description:{
        type:String,
        trim:true,
        require:true,
        minLength:[10,'too short artifact description'],
        maxLength:[500,'too long artifact description']
    },
    imgCover:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

// schema.post('init',function(el){
//     el.imgCover = process.env.BASE_URL + el.imgCover
// })

export const artifactModel = mongoose.model('artifact',schema)