import express from "express";
import Joi from "joi";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv"


dotenv.config();
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
        res.send(error.details);
        return;
    }
    res.send(userData);
});

app.post("/signin", async (req,res)=>{
    const user = req.body;
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const {error} = schema.validate(user,{abortEarly:false})
    console.log(error);
    res.send("ok");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Servidor online");
})