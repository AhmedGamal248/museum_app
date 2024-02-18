import { userModel } from "../../databases/models/userModel.js"

export const checkEmailExist = async (req,res,next) => {
    const user = await userModel.findOne({email:req.body.email})
    if(user) return res.json({message:'email is already exist'})
    next()
}