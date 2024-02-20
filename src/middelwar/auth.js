import jwt from 'jsonwebtoken'
import { appError } from '../utils/appError.js'

export const allawedTo = (...roles) => {
    return (req,res,next) => {
        jwt.verify(req.headers.token,'process.env.JWT_KEY',async(err,decoded)=>{
            if (err) return next(new appError(err,401))
            }) 
            let tst = jwt.decode(req.headers.token) 
            console.log(tst.role)
        if(!roles.includes(tst.role)) 
        return next(new appError('you are not authorized',401))

    next()
    }
}