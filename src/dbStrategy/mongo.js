import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoCLient = new MongoClient(process.env.MONGO_URI);
let db;
mongoCLient.connect(()=>{
    db = mongoCLient.db(process.env.MONGO_DATABASE);
});

const objectId = ObjectId;

export {objectId, db};