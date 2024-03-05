import express from 'express'
import { allowedTo, changePassword, deleteAccount, getAllUsers, getSingleUser, protectedRoutes, signIn, signUp, updateAccount, verify } from './user.controler.js';
import { checkEmailExist } from '../../middelwar/checkEmailEx.js';
import { addUserVal, changePasswordVal, paramsIdVal, updateUserVal } from './user.validation.js';
import { validation } from '../../middelwar/validation.js';

const userRouter = express.Router();

//signUp
userRouter.post('/signUp',validation(addUserVal),checkEmailExist,signUp)

//verify
userRouter.get('/verify/:token',verify)

//signIn
userRouter.post('/signIn',signIn)

// git all users
userRouter.get('/users',protectedRoutes,allowedTo('user'),getAllUsers)

// get singel user data
userRouter.get('/users/:id',protectedRoutes,validation(paramsIdVal),getSingleUser)

// update account
userRouter.put('/users/:id',protectedRoutes,validation(updateUserVal),updateAccount)

// delete account
userRouter.delete('/users/:id',protectedRoutes,validation(paramsIdVal),deleteAccount)

//change password
userRouter.patch('/changePassword',protectedRoutes,validation(changePasswordVal),changePassword)

// //forget password
// userRouter.post('/forgetPassword',frogetPassword)

// //resetPassword
// userRouter.post('/resetPassword/:token',resetPassword)

export {
    userRouter
}