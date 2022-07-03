import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import { db, objectId } from "./dbStrategy/mongo.js";
import dayjs from "dayjs";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

// Rotas de Autenticação    
app.use(authRouter);
app.post("/income", async (req,res)=>{
    const {authorization} = req.headers;
    const {value, description} = req.body;
    const token = authorization?.replace("Bearer ", "");
    
    console.log(typeof(value));
    const sessions = await db.collection("sessions").findOne({token});
    
    if(!sessions){
        return res.status(404).send("token não existe!");
    };
    const user = await db.collection("users").findOne({_id: sessions.userId});

    await db.collection("wallet").insertOne({
        userId : user._id,
        description,
        value,
        date: dayjs().format("DD/MM"),
        operation: "income"
    });
    res.send("ok");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Servidor online na PORT:${PORT}`);
})