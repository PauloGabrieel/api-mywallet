import { signInSchema } from '../schema/userSchema';

export default function signinValidation(req, res, next) {
nst userData = req.body;

    const { error } = signInSchema.validate(userData);

    if (error) {
        return res.status(422).send(error.details);
    };
    next();
};