import {db} from "../dbStrategy/postgres.js";

export default async function userAlreadyExists(req,res,next){
    const {email} = req.body;

    const userEmail = await db.collection("users").findOne({email});

    if(userEmail){
        return res.status(409).send("E-mail já cadastrado");
    };
    next();
};