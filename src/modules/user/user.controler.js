import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../../../databases/models/userModel.js';
import { catchError } from '../../middelwar/catchError.js';
import { sendEmails } from '../../emails/sendEmails.js';
import { appError } from '../../utils/appError.js';
import { ApiFeatures } from '../../utils/apiFeatures.js';
// import { sendEmailForReset } from '../../emails/sendEmailForReset.js';


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
const signIn = async (req,res) => {
    const found = await userModel.findOne({email:req.body.email});
    if (found &&  bcrypt.compareSync(req.body.password,found.password)) {
            let token = jwt.sign({Id:found._id,email:found.email,role:found.role},'process.env.JWT_KEY')            
            res.json({message:"success",token})
    
    } else {
        res.json({message:'email or password is not true'})
    }
}

// get all users
const getAllUsers = catchError(async(req,res) => {

    let apiFeatures = new ApiFeatures(userModel.find(),req.query)
    .pagination()
 
     let users = await apiFeatures.mongooseQuery;
     res.json({ massage: "successs",page:apiFeatures.pageNum,next_page:apiFeatures.nexP, users });

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
            jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
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
            jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
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


// // forget password and send email to reset
// const frogetPassword = catchError(async (req,res,next)=>{
//     const {email} = req.body
//     const found = await userModel.findOne({email})
//     if (found) {
//         sendEmailForReset(email)
//         res.json(`please check your email`)
//     }
//     else {
//         next(new appError('email not found',401))
//     }
// })


// // reset password
// const resetPassword = catchError(async(req,res,next)=> {
    
//     jwt.verify(req.params.token,process.env.JWT_KEY,async(err,decoded)=>{
//         if (err) return next(new appError(err,401))
//         // const pass = bcrypt.hashSync(decoded.newPassword,10)
//         await userModel.findOneAndUpdate({email:decoded.email},{password:req.body.pssword})
//         res.json({message:'success'})
//     })
    
// })


export {
    signUp,
    verify,
    signIn,
    getAllUsers,
    getSingleUser,
    updateAccount,
    deleteAccount,
    // frogetPassword,
    // resetPassword
}