import { MongoClient } from "mongodb";
import process from "process";
import * as toml from "toml";
import * as fs from "fs";
import { TConfig, TOpenSession, TStartSessionReturn } from "./types";

let homePath = process.env.HOME;
let configPath = "/.config/timelogger.toml";
let fullPath = homePath + configPath;
let dataRaw = fs.readFileSync(fullPath, "utf-8");
let config: TConfig = toml.parse(dataRaw);
let fillUser = config.mongoURI.replace("<username>", config.mongoUser);
let mongoString: string = fillUser.replace("<password>", config.mongoPass);
let client = new MongoClient(mongoString);
let database = client.db("TimeLoggerCluster");


export function humanTimeElapsed(time: number) {
    let secondsStart = time / 1000;
    let hours = Math.floor(secondsStart / 3600);
    let minutes = Math.floor((secondsStart - hours * 3600) / 60);
    let seconds = Math.floor(secondsStart - hours * 3600 - minutes * 60);
    return `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}


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

export async function fetchClosedSessions() {
    let collection = database.collection("closedSessions");
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
    };
    let data = await collection.insertOne(doc);

    let returnData: TStartSessionReturn = {
        sessAdded: data.acknowledged,
        sessStartTime: currentTime,
    };
    return returnData;
}

export async function closeLastSession() {
    let collection = database.collection("openSessions");
    let query = { deviceID: config.deviceName };
    let result = await collection.findOneAndDelete(query, {
        sort: { _id: -1 },
    });
    if (result.value == null) {
        return "Open session first!";
    } else {
        let timeDelta = calcTime(result?.value?.sessionTimeStartDateObj);

        let newClosedSes = {
            deviceID: config.deviceName,
            sessionTimeStartDateObj: result?.value?.sessionTimeStartDateObj,
            sessionTimeDelta: timeDelta,
        };

        let newConnection = database.collection("closedSessions");
        let cursor = await newConnection.insertOne(newClosedSes);

        return `Session started on ${result?.value?.sessionTimeStartDateObj.toLocaleString()} closed. \nTotal time: ${humanTimeElapsed(timeDelta)}`;
    }
}

export async function totalSessionTime() {
    let collection = database.collection("closedSessions");
    let returnTotalTime = {
        totalTime: 0,
        totalSeshNumber: 0,
    };
    let data = await collection.find().toArray();
    let tempTime: number = 0;
    data.forEach((ses: any) => {
        let temp = JSON.parse(JSON.stringify(tempTime));
        temp = temp + ses.sessionTimeDelta;
        tempTime = temp;
    });
    returnTotalTime.totalSeshNumber = data.length;
    returnTotalTime.totalTime = tempTime;
    return returnTotalTime;
}
