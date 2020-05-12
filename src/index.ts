import express from "express";
import morgan from "morgan";

import { handleReviewAdd, handleReviewDelete, handleReviewEdit } from "./handlers/reviewHandlers";
import {
	handleGetTotalCompanies,
	handleCompanyAdd,
	handleCompanyDelete,
	handleCompanyEdit,
} from "./handlers/companyHandlers";
import {
	handleGetTotalProducts,
	handleGetCompanyProducts,
	handleProductAdd,
	handleProductDelete,
	handleProductEdit,
} from "./handlers/productHandlers";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const port: number = Number(process.env.PORT) || 8080;

// TODO: Database for company
// TODO: Need a database of products
// TODO: Database for review
// TODO: Make some fukin schema
// TODO: Tests

app.get("/company", (req: any, res: any) => {
	handleGetTotalCompanies(req, res);
});

app.post("/company", (req: any, res: any) => {
	handleCompanyAdd(req, res);
});

app.delete("/company/:companyID", (req: any, res: any) => {
	handleCompanyDelete(req, res);
});

app.patch("/company/:companyID", (req: any, res: any) => {
	handleCompanyEdit(req, res);
});

app.get("/products", (req: any, res: any) => {
	handleGetTotalProducts(req, res);
});

app.get("/products/:companyID", (req: any, res: any) => {
	handleGetCompanyProducts(req, res);
});

app.post("/products", (req: any, res: any) => {
	handleProductAdd(req, res);
});

app.delete("/products/:productID", (req: any, res: any) => {
	handleProductDelete(req, res);
});

app.patch("/products/:productID", (req: any, res: any) => {
	handleProductEdit(req, res);
});

app.post("/reviews/:productID", (req: any, res: any) => {
	handleReviewAdd(req, res);
});

app.delete("/reviews/:reviewID", (req: any, res: any) => {
	handleReviewDelete(req, res);
});

app.patch("/reviews/:reviewID", (req: any, res: any) => {
	handleReviewEdit(req, res);
});

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
