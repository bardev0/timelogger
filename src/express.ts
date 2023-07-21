import app from "./app";

// move PORT to env
const PORT = 5123;
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
