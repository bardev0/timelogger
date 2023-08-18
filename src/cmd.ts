import process from "process";
import { fetchOpenSession } from "./conn";
const args = process.argv.splice(2);

//debug
console.log(args);
async function runtime() {
    switch (args[0]) {
        case "--start":
            console.log("start");
            break;
        case "--end":
            console.log("stop");
            break;
        case "--list":
            console.log("list");
            break;
        case "--total":
						let data = await fetchOpenSession()
            console.log(data);
						process.exit();
        default:
            console.log("Wrong agruments");
    }
}

runtime()
