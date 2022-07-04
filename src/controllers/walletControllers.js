import {db, objectId} from "../dbStrategy/mongo.js";
import dayjs from "dayjs";

async function getWallet(req, res){
    const session = res.locals.session;
    try {
        const user = await db.collection("users").findOne({_id: session.userId});
        const income = await db.collection("wallet").find({userId: session.userId, operation: "income"}).toArray();
        const expense = await db.collection("wallet").find({userId: session.userId, operation: "expense"}).toArray(); 
        console.log(income[0].value);
        let totalIncome = 0;
        let totalExpense = 0;
        income.map(item => {
            delete item._id;
            delete item.userId;
            delete item.operation;
            totalIncome += parseInt(item.value);
        });
        expense.map(item => {
            delete item._id;
            delete item.userId;
            delete item.operation;
            totalExpense += parseInt(item.value);
        });
        console.log(totalIncome);
        console.log(income[0].value);
        const data = {
            name: user.name,
            income: income,
            expense: expense,
            total: (totalIncome-totalExpense).toFixed(2)
        }
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
    
};
async function logout(req,res){
    const session = res.locals.session;
    try {
        await db.collection("sessions").deleteMany({userId: session.userId})
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
}

async function newCashInFlow(req, res){
    const session = res.locals.session;
    const {value, description} = req.body;
    try {
        const user = await db.collection("users").findOne({_id: session.userId});
    
        await db.collection("wallet").insertOne({
            userId: user._id,
            description,
            value: parseInt(value).toFixed(2),
            date: dayjs().format("DD/MM"),
            operation: "income"
        });
        res.status(201).send("ok"); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
    
};

async function expense(req,res){
    const session = res.locals.session;
    const {value, description} = req.body;
    
    try {
        const user = await db.collection("users").findOne({_id: session.userId});
    
        await db.collection("wallet").insertOne({
            userId: user._id,
            description,
            value: parseInt(value).toFixed(2),
            date: dayjs().format("DD/MM"),
            operation: "expense"
        });
        res.status(201).send("ok"); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
    
};


export { getWallet, newCashInFlow, expense, logout };