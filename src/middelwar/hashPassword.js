import bcrypt from 'bcrypt'


const hashPassword = (req,res,next) => {
    req.body.password = bcrypt.hashSync(req.body.password,10)
    next()
}

export {
    hashPassword  
}