import joi from "joi";

const addArtifactVal = joi.object({
    title: joi.string().min(1).max(1000).trim().required(),
    description: joi.string().min(1).max(3000).trim().required(),
    createdBy: joi.string().hex().length(24),

    imgCover: joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype: joi.string().valid('image/png', 'image/jpeg','image/jpg', 'image/gif').required(),
        destination:joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(10000000).required()
        }),
    })


const paramsIdVal = joi.object({
    id: joi.string().hex().length(24).required()
})


const updateArtifactVal = joi.object({
    title: joi.string().min(1).max(1000).trim(),
    description: joi.string().min(1).max(3000).trim(),
    createdBy: joi.string().hex().length(24),

    imgCover: joi.array().items(joi.object({
        fieldname:joi.string().required(),
        originalname:joi.string().required(),
        encoding:joi.string().required(),
        mimetype: joi.string().valid('image/webp','image/png', 'image/jpeg','image/jpg', 'image/gif').required(),
        destination:joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().max(1000000).required()
        })),
    })



export {
    addArtifactVal,
    paramsIdVal,
    updateArtifactVal,
}