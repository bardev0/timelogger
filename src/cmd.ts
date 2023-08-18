import process from "process";
import { fetchOpenSession, startOpenSession, closeLastSession } from "./conn";
import {TStartSessionReturn} from "./types";
const args = process.argv.splice(2);

//debug
// console.log(args);
async function runtime() {
    switch (args[0]) {
        // works
        // start session
        case "-s":
            let dane = await startOpenSession();
            console.log(`Session started : ${dane.sessAdded}\nTime Start : ${dane.sessStartTime.toLocaleString()}`); 
            process.exit();
        // works
        // close session
        case "-c":
            let lastSes = await closeLastSession();
            console.log(lastSes);
            process.exit();

        // list closed sessions
        case "-lcs":
            console.log("list");
            break;

        // list open sessions
        case "-los":
            break;

        // total time
        case "-t":
            let data = await fetchOpenSession();
            data.forEach((arry) => console.log(arry));
            process.exit();
        default:
            console.log("Wrong agruments");
    }
}

runtime();
