import { signUpSchema } from "../schema/userSchema.js";

export default function signUpValidatin(req,res, next){
    const userData = req.body;
    
    const {error} = signUpSchema.validate(userData)
    if(error){
        return res.status(422).send(error.details);
    };
    next();
};
