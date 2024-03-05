import joi from "joi";

const addUserVal = joi.object({
    userName: joi.string().trim().min(2).required(),
    email: joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required(),
    rePassword:joi.valid(joi.ref('password')).required(),
    role: joi.string().valid('user', 'Company_HR')
})


const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateUserVal = joi.object({
    id: joi.string().hex().length(24).required(),
    userName: joi.string().trim().min(2),
    email: joi.string().email(),
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/),
    role: joi.string().valid('user', 'Company_HR')
})

//change password schema validation
const changePasswordVal = joi.object({
    password:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required(),
    newPassword:joi.string().pattern(/^[A-Z][a-z0-9_]{10,30}$/).required()
}
)  

export {
    addUserVal,
    paramsIdVal,
    updateUserVal,
    changePasswordVal
}