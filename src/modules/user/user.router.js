import express from 'express'
import { signIn, signUp, verify } from './user.controler.js';
import { checkEmailExist } from '../../middelwar/checkEmailEx.js';
import { addUserVal } from './user.validation.js';
import { validation } from '../../middelwar/validation.js';

const userRouter = express.Router();

//signUp
userRouter.post('/signUp',validation(addUserVal),checkEmailExist,signUp)

//verify
userRouter.get('/verify/:token',verify)

//signIn
userRouter.post('/signIn',signIn)


export {
    userRouter
}