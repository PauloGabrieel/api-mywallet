import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
});

const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export { signInSchema, signUpSchema };
