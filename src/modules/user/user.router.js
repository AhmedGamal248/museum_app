import express from 'express'
import { deleteAccount, getAllUsers, getSingleUser, signIn, signUp, updateAccount, verify } from './user.controler.js';
import { checkEmailExist } from '../../middelwar/checkEmailEx.js';
import { addUserVal, paramsIdVal } from './user.validation.js';
import { validation } from '../../middelwar/validation.js';
import { allawedTo } from '../../middelwar/auth.js';

const userRouter = express.Router();

//signUp
userRouter.post('/signUp',validation(addUserVal),checkEmailExist,signUp)

//verify
userRouter.get('/verify/:token',verify)

//signIn
userRouter.post('/signIn',signIn)

// git all users
userRouter.get('/users',getAllUsers)

// get singel user data
userRouter.get('/users/:id',validation(paramsIdVal),getSingleUser)

// update account
userRouter.put('/user/:id',updateAccount)

// delete account
userRouter.delete('/user/:id',deleteAccount)

export {
    userRouter
}