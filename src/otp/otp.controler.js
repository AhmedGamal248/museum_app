import { generateOTP } from "../utils/generateOTP.js"
import { sendEmailsWithOtp } from "../utils/sendEmailWithOTP.js"
import { OTP } from "./model"

const sendOtp = async ({email , subject , message , duration = 1}) => {

    try {
        if(!(email && subject && message)) {
            return "email && subject && message is requored"
        }

        await OTP.deleteOne({email})

        const generateOTP = await generateOTP()

        const mailOptions = {
            from: "ag2849315@gmail.com",
            to: email,
            subject,
            html: `<p>${message}</p><p style ="color:tomato;font-size:25px><p>${generateOTP}</p></p><p>
            tith code <b>expires in ${duration} hour(s)</b></p>`
        }

        await sendEmailsWithOtp(mailOptions)

        const newOTP = await new OTP ({
            email,
            otb:generateOTP,
            createdAt:Date.now(),
            expiresAt:Date.now() + 3600000 * +duration,
        })

        const createOtpRecord = await newOTP.save()
        return createOtpRecord

    } catch (error) {
        console.log(error)
    }
}

export {
    sendOtp
}