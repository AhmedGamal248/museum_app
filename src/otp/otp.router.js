import express from 'express'
import { sendOtp } from './otp.controler'

const otpRouter = express.Router()

otpRouter.post("/", async(req,res)=> {
    try {
        const{email , subject , message , duration} = req.body

        const createdOtp = await sendOtp({
            email,
            subject,
            message,
            duration
        })
        res.json(createdOtp)
    } catch (error) {
        res.json(error.message)
    }
})

export {
    otpRouter
}