import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import walletRouter from "./routes/walletRouter.js"
import { db, objectId } from "./dbStrategy/mongo.js";
import dayjs from "dayjs";


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

// Rotas de Autenticação    
app.use(authRouter);
app.use(walletRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Servidor online na PORT:${PORT}`);
})