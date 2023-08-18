import { MongoClient } from "mongodb";
import process from "process";
import * as toml from "toml";
import * as fs from "fs";
import { TConfig, TOpenSession } from "./types";

let homePath = process.env.HOME;
let configPath = "/.config/timelogger.toml";
let fullPath = homePath + configPath;
let dataRaw = fs.readFileSync(fullPath, "utf-8");
let config: TConfig = toml.parse(dataRaw);
let fillUser = config.mongoURI.replace("<username>", config.mongoUser);
let mongoString: string = fillUser.replace("<password>", config.mongoPass);
let client = new MongoClient(mongoString);
let database = client.db("TimeLoggerCluster");

function calcTime(startDate: Date) {
    const timeNow = Date.now();
    const timeDelta = timeNow - startDate.getTime();
    return timeDelta;
}

export async function fetchOpenSession() {
    let collection = database.collection("openSessions");
    let result = await collection.find().toArray();
    return result;
}

export async function startOpenSession() {
    // add check if there non open sessions

    let collection = database.collection("openSessions");
    const currentTime: Date = new Date();
    const currentTimeString = currentTime.toUTCString();
    let doc: TOpenSession = {
        deviceID: config.deviceName,
        sessionTimeStartDateObj: currentTime,
        sessionTimeStartString: currentTimeString,
    };
    let data = await collection.insertOne(doc);
    return data;
}

export async function closeLastSession() {
    let collection = database.collection("openSessions");
    let query = { deviceID: "macMiniM1" };
    let result = await collection.findOneAndDelete(query, {
        sort: { _id: -1 },
    });

    let timeDelta = calcTime(result?.value?.sessionTimeStartDateObj);

    let newClosedSes = {
        deviceID: config.deviceName,
        sessionTimeStartDateObj: result?.value?.sessionTimeStartDateObj,
        sessionTimeDelta: timeDelta,
    };

    let newConnection = database.collection("closedSessions");
    let cursor = await newConnection.insertOne(newClosedSes);

    return `Session started on ${result?.value?.sessionTimeStartDateObj.toUTCString()} closed. \nTotal time: ${timeDelta}`;
}
