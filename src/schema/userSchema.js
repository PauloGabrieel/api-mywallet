import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('password')
})

const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});


export {signInSchema, signUpSchema};
