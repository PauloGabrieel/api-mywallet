import { signInSchema } from "../schema/userSchema.js";

export default function signinValidation(req, res, next){
    const userData = req.body;

    const {error} = signInSchema.validate(userData);

    if(error){
        return res.status(422).send(error.details);
    };
    next();
};