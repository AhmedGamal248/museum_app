import mongoose from "mongoose";

//

export const DBconnection = () => {
    // mongoose.connect("mongodb+srv://ahmed:ahmedgamal@cluster0.41ojruz.mongodb.net/graduation_P_DB").then(()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/graduation_P_DB").then(()=>{
        console.log('database connected successfuly...')
    }).catch((err)=>{
        console.log('database err connection',err)
    })
}  