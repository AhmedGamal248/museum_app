import mongoose from "mongoose";

const OTPShema = new Schema ({
    email:{
        type:String,
        uniqe:true
    },
    otp: String,
    createdAt: Date,
    expiresAt: Date
});

export const OTP = mongoose.model('OTP', OTPShema)