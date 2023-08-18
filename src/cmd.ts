import process from "process";
import {
    fetchOpenSession,
    startOpenSession,
    closeLastSession,
    totalSessionTime,
		fetchClosedSessions,
} from "./conn";
import { TStartSessionReturn } from "./types";
const args = process.argv.splice(2);

function humanTimeElapsed(time: number) {
    let secondsStart = time / 1000;
    let hours = Math.floor(secondsStart / 3600);
    let minutes = Math.floor((secondsStart - hours * 3600) / 60);
    let seconds = Math.floor((secondsStart - (hours * 3600) - (minutes * 60)));
    return `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}
//debug
// console.log(args);
async function runtime() {
    switch (args[0]) {
        // works
        // start session
        case "-s":
            let data1 = await startOpenSession();
            console.log(
                `Session started : ${
                    data1.sessAdded
                }\nTime Start : ${data1.sessStartTime.toLocaleString()}`
            );
            process.exit();
        // works
        // close session
        case "-c":
            let lastSes = await closeLastSession();
            console.log(lastSes);
            process.exit();

        // list closed sessions
        case "-lcs":
						let data5 = await fetchClosedSessions()
						data5.forEach((ses) => {
						console.log(ses.deviceID + " " + ses.sessionTimeStartDateObj.toLocaleString())
						console.log(humanTimeElapsed(ses.sessionTimeDelta))
						})
            break;

        // list open sessions
        case "-los":
            let data3 = await fetchOpenSession();
            console.log("Open sessions :");
            data3.forEach((s) => {
                console.log(
                    `Device ID: ${
                        s.deviceID
                    } \nSession started : ${s.sessionTimeStartDateObj.toLocaleString()} \n`
                );
            });
            process.exit();
        // total time
        case "-t":
            let data4 = await totalSessionTime();
            console.log(`Total time : ${humanTimeElapsed(
                data4.totalTime
            )}\nTotal number of sessions: ${data4.totalSeshNumber}
												`);
            process.exit();
        default:
            console.log("Wrong agruments");
    }
}

runtime();
