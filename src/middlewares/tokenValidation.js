import { db } from "../dbStrategy/mongo.js"

export default async function tokenValidation(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    
    const session = await db.collection("sessions").findOne({token});
    
    if(!session){
        return res.status(404).send("token não existe!");
    };
    res.locals.session = session;
    next();
};