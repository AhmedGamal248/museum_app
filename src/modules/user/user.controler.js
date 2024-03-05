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
const signIn = async (req,res,next) => {

    const found = await userModel.findOne({email:req.body.email});

    if (found &&  bcrypt.compareSync(req.body.password,found.password)) {

        await userModel.findOneAndUpdate({email:req.body.email},{status:'online'})

            let token = jwt.sign({userId:found._id,email:found.email,role:found.role},'process.env.JWT_KEY')            
            res.json({message:"success",token})
    
    } else {
        next (new appError('email or password is not true',401)) 
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

    //find user by id from params 
        const user = await userModel.findById(req.params.id)

        //verify token 
        if (user) {
            jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
                if (err) return next(new appError(err,401))

                let accountOwner = jwt.decode(req.headers.token)

            // check if account owner or not 
                if(accountOwner.email == user.email) {

                    //user mast be loged in to update account
                    if ( user.status == 'online') {
                        user.set(req.body)
                        await user.save()
                        return res.json({message:'success'})
                        } else {
                            next (new appError('some thing rong you must be loged in',401))
                        }
                } else {
                    next (new appError('you are unothorized to do this',401))
                }
            })
        } else {
            next (new appError('user not found',404))
        }
    })


// delete user
const deleteAccount = catchError( async (req,res,next) => {
        //find user by id from params
        const user = await userModel.findById(req.params.id)

        //verify token 
        if (user) {
            jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
                if (err) return next(new appError(err,401))

                let accountOwner = jwt.decode(req.headers.token)

                // check if account owner or not
                if(accountOwner.email == user.email) {

                    //user mast be loged in to update account
                    if ( user.status == 'online') {
                        await user.deleteOne()
                        return res.json({message:'success'})
                        } else {
                            next (new appError('some thing rong you must be loged in',401))
                        }
                } else {
                    next (new appError('you are unothorized to do this',401))
                }
            })
        } else {
            next (new appError('user not found',404))
        }
})


// change password 
const changePassword = async (req,res,next)=> {

    const user = await userModel.findById(req.user._id)

    // check if password is true or not
    if (user && bcrypt.compareSync(req.body.password,user.password)){ 

        const token = jwt.sign({userId:user._id,email:user.email,role:user.role},'ay7aga')
        await userModel.findByIdAndUpdate(req.user._id,{
            password:req.body.newPassword ,
            passwordChangedAt:Date.now()
        })

        return res.json({message:"success",token})

    } else {
        next (new appError('incorrect password',401))
    }
}


// protected Routes
const protectedRoutes = async (req,res,next)=> {
  
    let token = req.headers.token
    // check if token is exist
    if (!token) return next (new appError('token must be provided',401))

    //verify token
    let decoded = jwt.verify(token,'process.env.JWT_KEY')

    //find user by id from token
    let user = await userModel.findById(decoded.userId)

    if (!user) return next (new appError('user .not found',404))

    //check if token is still valid
    if(user.passwordChangedAt) {

        //convert time of password chenged at to milly sec
        let passChangedTime = parseInt(user?.passwordChangedAt.getTime()/1000 )

        // if password changed after token creted user must be login again
        if (passChangedTime>decoded.iat) return next (new appError('invalid token please login again',401)) 

    }

    //send the date to the next middelwar
     req.user = user

    next()
}


// allowed To
const allowedTo = (...roles) => {
    return async(req,res,next) => {
        if (roles.includes(req.user.role)) {
            next()
        } else {
           next(new appError('you are not authorized',401)) 
        } 
    }     
}


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
    changePassword,
    protectedRoutes,
    allowedTo
    // frogetPassword,
    // resetPassword
}