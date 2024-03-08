import express from 'express'
import { allowedTo, changePassword, deleteAccount, getAllUsers, getSingleUser, protectedRoutes, signIn, signUp, updateAccount, verify } from './user.controler.js';
import { checkEmailExist } from '../../middelwar/checkEmailEx.js';
import { addUserVal, changePasswordVal, paramsIdVal, updateUserVal } from './user.validation.js';
import { validation } from '../../middelwar/validation.js';
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { userModel } from '../../../databases/models/userModel.js';
import bcrypt from 'bcrypt'


const userRouter = express.Router();

// Generate a new OTP secret key for a user
const generateOTPSecret = async (user,token) => {
    const secret = speakeasy.generateSecret();
    const otpSecretString = secret.base32;
    return secret;
  };

  // Send OTP code to the user via email
  const sendOTPCode = async (email, token) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "ag2849315@gmail.com",
        pass: "ymkqewznkajvsgsq",
      },
    });
  
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your password reset OTP: ${token}`,
    };
  
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  };
  
  // Define an endpoint for initiating the password reset process
userRouter.post('/reset-password', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find the user by email
      const user = await userModel.findOne({email});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a new OTP secret key for the user
      const secret = generateOTPSecret(user);
  
      // Generate an OTP based on the secret key
      let token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
      });
  
      // Send the OTP code to the user via email
      await sendOTPCode(email, token);

      user.otpSecret = token;
      await user.save();
  
      // Generate a QR code for setting up OTP-based authentication
      const qrCode = await qrcode.toDataURL(secret.otpauth_url);
  
      res.json({ qrCode });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to initiate password reset' });
    }
});

  
// checking OTP code and updating the password
userRouter.post('/verify-otp', async (req, res) => {
    try {
      const { email, otpCode, newPassword } = req.body;
  
      // Find the user by email
      const user = await userModel.findOne({email});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  

      // Update the user's password
      const hashedPassword = bcrypt.hashSync(newPassword,10)
      await userModel.findOneAndUpdate({email},{password:hashedPassword})
  
      res.json({ message: 'Password updated successfully' });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to verify OTP code and update password' });
    }
});



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



export {
    userRouter
}