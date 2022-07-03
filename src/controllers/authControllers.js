import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid"
import dotenv from "dotenv";
import {db , objectId} from "../dbStrategy/mongo.js";

dotenv.config();

async function createUser(req, res){
    const userData = req.body;
    try {
        const cryptPassword = bcrypt.hashSync(userData.password,10);

        await db.collection("users").insertOne({
            name: userData.name,
            email: userData.email,
            password: cryptPassword
        })
        res.status(201).send("Usuário Criado!");
    } catch (error) {
      console.log(error);  
    };
};

async function loginUser(req,res){
    const userData = req.body;
    try {
    
        const user = await db.collection("users").findOne({email: userData.email});
        
        if(!user){
            res.status(404).send("Usuário não encontrado (email ou senha incorretos");
            return;
        };
        const validPassword = bcrypt.compareSync(userData.password, user.password);
        if(validPassword){
            const token = uuid();
            
            await db.collection("sessions").insertOne({
                userId: user._id,
                token 
            });
        
            res.status(200).send(token);
        };

    } catch (error) {
        console.log(error);
    }
};

export { createUser, loginUser};