import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../../../databases/models/userModel.js';
import { catchError } from '../../middelwar/catchError.js';
import { sendEmails } from '../../emails/sendEmails.js';


//sign up
const signUp = catchError(async (req,res) => {
    sendEmails(req.body.email)
    let user = new userModel(req.body)
    let token = jwt.sign({userId:user._id,email:user.email,role:user.role},'process.env.JWT_KEY')
    await user.save()
    res.json({message:'success',token})
})


// verify account
const verify = catchError(async(req,res,next)=> {
    jwt.verify(req.params.token,'process.env.JWT_KEY',async(err,decoded)=>{
        if (err) return next(new appError(err,401))
        await userModel.findOneAndUpdate({email:decoded.email},{verfiyEmail:true})
        res.json(`success`)
    })
    
})


//sign in
const signIn = catchError(async (req,res) => {
    const user = await userModel.findOneAndUpdate({
        $or:[
            {email:req.body.email},
            { mobile:req.body.mobile}
        ]
    },{status:'online'})
    const fUser = await userModel.findOne({email:req.body.email})
    if (fUser && bcrypt.compareSync(req.body.password,user.password)){
        let token = jwt.sign({userRole:user.role,userId:user._id,email:user.email},'process.env.JWT_KEY')
        return res.json({message:'success',token})
    }
    res.json({message:'email or password is not true'})
})

// get all users
const getAllUsers = async(req,res) => {
    const users = await userModel.find({})
    res.json({message:'success',users})
}




export {
    signUp,
    verify,
    signIn,
    getAllUsers
}