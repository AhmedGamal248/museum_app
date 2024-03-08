import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        require:true,
        minLength:[2,'too short  user name']
    },
    email:{
        type:String,
        trim:true,
        require:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
    },
    role: {
        type: String,
        enum: ['user', 'company_hr'],
        default: "user",
        lowercase: true
    },
    status:{
        type:String,
        enum:['online','ofline'],
        default:'ofline'
    },
    verfiyEmail:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    passwordChangedAt:Date,

    otpSecret: {
        type: String,
        default: null,
      },

},{timestamps:true})


schema.pre('save',function () {
    this.password = bcrypt.hashSync(this.password,10)
})


export const userModel = mongoose.model('user',schema)

