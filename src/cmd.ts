import process from "process";
import { fetchOpenSession, startOpenSession, closeLastSession } from "./conn";
const args = process.argv.splice(2);

//debug
// console.log(args);
async function runtime() {
    switch (args[0]) {
        // works
        // start session
        case "-s":
            let start = await startOpenSession();
            console.log(start);
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
