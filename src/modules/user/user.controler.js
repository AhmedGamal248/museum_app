import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../../../databases/models/userModel.js';
import { catchError } from '../../middelwar/catchError.js';
import { sendEmails } from '../../emails/sendEmails.js';
import { appError } from '../../utils/appError.js';


//sign up
const signUp = catchError(async (req,res) => {
    sendEmails(req.body.email)
    let user = new userModel(req.body)
    let token = jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_KEY)
    await user.save()
    res.json({message:'success',token})
})


// verify account
const verify = catchError(async(req,res,next)=> {
    jwt.verify(req.params.token,process.env.JWT_KEY,async(err,decoded)=>{
        if (err) return next(new appError(err,401))
        await userModel.findOneAndUpdate({email:decoded.email},{verfiyEmail:true})
        res.json(`success`)
    })
    
})


//sign in
const signIn = catchError(async (req,res) => {
    const fUser = await userModel.findOne({email:req.body.email})
    if (fUser && bcrypt.compareSync(req.body.password,fUser.password)){
        fUser.status = 'online'
        await fUser.save()
        let token = jwt.sign({userRole:fUser.role,userId:fUser._id,email:fUser.email},process.env.JWT_KEY)
        return res.json({message:'success',token})
    }
    res.json({message:'email or password is not true'})
})

// get all users
const getAllUsers = catchError(async(req,res) => {
    const users = await userModel.find({})
    res.json({message:'success',users})
})

// get singel user data
const getSingleUser = catchError(async(req,res) => {
    const user = await userModel.findById(req.params.id)
    res.json({message:'success',user})
})


// update user
const updateAccount = catchError( async (req,res,next) => {
    console.log(req.headers.token)
        const user = await userModel.findById({_id:req.params.id})
        if (user) {
            jwt.verify(req.headers.token,process.env.JWT_KEY,async(err,decoded)=>{
                if (err) return next(new appError(err,401))
                let tst = jwt.decode(req.headers.token)
                if(tst.email == user.email) {
                    if ( user.status == 'online') {
                        user.set(req.body)
                        await user.save()
                        return res.json({message:'success'})
                        } else {
                            res.json({message:'somthing rong '})
                        }
                } else {
                    res.json(`you are unothorized to do this`)
                }
            })
        } else {
            res.json({message:'user not found'})
        }
    })


// delete user
const deleteAccount = catchError( async (req,res,next) => {
        const user = await userModel.findById({_id:req.params.id})
        if (user) {
            jwt.verify(req.headers.token,process.env.JWT_KEY,async(err,decoded)=>{
                if (err) return next(new appError(err,401))
                let tst = jwt.decode(req.headers.token)
                if(tst.email == user.email) {
                    if ( user.status == 'online') {
                        await user.deleteOne()
                        return res.json({message:'success'})
                        } else {
                            res.json({message:'somthing rong '})
                        }
                } else {
                    res.json(`you are unothorized to do this`)
                }
            })
        } else {
            res.json({message:'user not found'})
        }
    })




export {
    signUp,
    verify,
    signIn,
    getAllUsers,
    getSingleUser,
    updateAccount,
    deleteAccount
}