import Joi from "joi";

const loginValidation = Joi.object({
    user_name: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    firebase_token: Joi.string().trim().optional().allow(null, '')
});


export {
    loginValidation
}