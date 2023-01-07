import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter";
// import walletRouter from "./routes/walletRouter"



dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
// app.use(walletRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Servidor online na PORT:${PORT}`);
})

export default app;
