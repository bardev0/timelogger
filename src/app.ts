import express from "express";
import { fetchOpenSession } from "./conn";

const app = express();

app.get("/openSessions", async () => {
	let d = await fetchOpenSession()
	console.log(d)
})

export default app;
