import { MongoClient } from "mongodb";
import process from "process";
import dotenv from "dotenv";
dotenv.config();
const pass = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://greg1111:${pass}@cluster0.nsckr5l.mongodb.net/?retryWrites=true&w=majority`;
const cliet = new MongoClient(uri);

export async function fetchOpenSession() {
		let database = cliet.db("TimeLoggerCluster")
		let collection = database.collection("openSessions")

		let result = await collection.find().toArray()
		return result
	}
 
