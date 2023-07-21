import process from "process";

const args = process.argv.splice(2)

//debug
console.log(args)

switch (args[0]) {
	case "--start" :
		console.log("start")
		break;
	case "--end" :
		console.log("break")
		break;
	case "--list":
		console.log("list")
		break;
	case "--total":
		console.log("total")
		break;
	default:
		console.log("Wrong agruments")
}
