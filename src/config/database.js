import { MongoClient} from 'mongodb';
import dotenv from "dotenv";

dotenv.config();
const mongoURL=process.env.MONGO_URL;
const mongoClient=new MongoClient(mongoURL);

try{
  await mongoClient.connect();
  console.log("Mongo conectado!");
}catch(err){
  console.log(err.message);
}
export const db = mongoClient.db();