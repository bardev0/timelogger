import { MongoClient } from "mongodb";
import process from "process";
import * as toml from "toml";
import * as fs from "fs";
import { TConfig } from "./types";

let homePath = process.env.HOME;
let configPath = "/.config/timelogger.toml";
let fullPath = homePath + configPath;
let dataRaw = fs.readFileSync(fullPath, "utf-8");
let config: TConfig = toml.parse(dataRaw);
console.log(config);

let fillUser = config.mongoURI.replace("<username>", config.mongoUser);
let mongoString: string = fillUser.replace("<password>", config.mongoPass);
console.log(mongoString);

export async function fetchOpenSession() {
    let client = new MongoClient(mongoString);
    let database = client.db("TimeLoggerCluster");
    let collection = database.collection("openSessions");
    let result = await collection.find().toArray();
    return result;
}
