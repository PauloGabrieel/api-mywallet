import express from "express";
import Joi from "joi";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
dotenv.config();


const mongoCLient = new MongoClient(process.env.MONGO_URI);


const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async(req,res)=>{
    const userData = req.body;
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: Joi.ref('password')
    });
    const {error} = schema.validate(userData,{abortEarly: false});

    if(error){
        res.status(422).send(error.details);
        return;
    }
    try {
        await mongoCLient.connect();
        
        const db = mongoCLient.db(process.env.DATABASE);
        const UserAlreadyExists = await db.collection("users").findOne({email: userData.email});
        
        if(UserAlreadyExists){
            res.status(409).send("E-mail já cadastrado");
            mongoCLient.close();
        }
        
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
});

app.post("/signin", async(req,res)=>{
    const userData = req.body;
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const {error} = schema.validate(userData,{abortEarly:false});
    
    if(error){
        res.sendStatus(422);
        return;
    }
    try {
        await mongoCLient.connect();
        const db = mongoCLient.db(process.env.DATABASE);
        const user = await db.collection("users").findOne({email: userData.email});

        if(!user){
            res.status(404).send("Usuário não existe");
            return;
        };


    } catch (error) {
        console.log(error);
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Servidor online");
})