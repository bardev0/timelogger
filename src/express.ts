import app from "./app";
import dotenv from "dotenv";
dotenv.config();
// move PORT to env
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
