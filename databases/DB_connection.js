import mongoose from "mongoose";

//

export const DBconnection = () => {
    mongoose.connect(process.env.BASE_URL).then(()=>{
    // mongoose.connect("mongodb://127.0.0.1:27017/graduation_P_DB").then(()=>{
        console.log('database connected successfuly...')
    }).catch((err)=>{
        console.log('database err connection',err)
    })
}  