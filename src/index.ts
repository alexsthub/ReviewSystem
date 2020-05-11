import express from "express";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const port = 8080;

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
