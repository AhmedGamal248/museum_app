import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true,'the product highlight name used'],
        trim:true,
        require:true,
        minLength:[2,'too short highlight name']
    },
    description:{
        type:String,
        trim:true,
        require:true,
        minLength:[10,'too short highlight description'],
        maxLength:[500,'too long highlight description']
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

export const highlightModel = mongoose.model('highlight',schema)