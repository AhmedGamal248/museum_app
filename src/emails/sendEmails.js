import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { emailTemplet } from './sendEmailTemplet.js';

export const sendEmails = async (email)=> {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: "ag2849315@gmail.com",
              pass: "ymkqewznkajvsgsq",
            },
          });
        
        let token = jwt.sign({email},'process.env.JWT_KEY')
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: 'Musuam App Support', // sender address
              to: email, // list of receivers
              subject: "Hello blabal", // Subject line  
              html: emailTemplet(token), // html body
              // html: emailTemplet(email), // html body
            });
        
            console.log("Message sent: %s", info.messageId);
    }
    
    


