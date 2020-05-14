import express from "express";
import morgan from "morgan";

import connectToMYSQL from "./db/database";
import {
	handleGetReview,
	handleReviewAdd,
	handleReviewDelete,
	handleReviewEdit,
	handleGetTotalReviews,
} from "./handlers/reviewHandlers";
import {
	handleGetTotalCompanies,
	handleCompanyAdd,
	handleCompanyDelete,
	handleCompanyEdit,
} from "./handlers/companyHandlers";
import {
	handleGetSpecificProduct,
	handleGetTotalProducts,
	handleGetCompanyProducts,
	handleProductAdd,
	handleProductDelete,
	handleProductEdit,
} from "./handlers/productHandlers";

export default function createMux(test: boolean) {
	const app = express();
	app.use(express.json());
	app.use(morgan("dev"));

	const port: number = Number(process.env.PORT) || 8080;
	const db = connectToMYSQL(test);

	app.get("/company", (req: any, res: any) => {
		handleGetTotalCompanies(req, res, db);
	});

	app.post("/company", (req: any, res: any) => {
		handleCompanyAdd(req, res, db);
	});

	app.delete("/company/:companyID", (req: any, res: any) => {
		handleCompanyDelete(req, res, db);
	});

	app.patch("/company/:companyID", (req: any, res: any) => {
		handleCompanyEdit(req, res, db);
	});

	app.get("/products/:productID", (req: any, res: any) => {
		handleGetSpecificProduct(req, res, db);
	});

	app.get("/products", (req: any, res: any) => {
		handleGetTotalProducts(req, res, db);
	});

	app.get("/products/:companyID", (req: any, res: any) => {
		handleGetCompanyProducts(req, res, db);
	});

	app.post("/products", (req: any, res: any) => {
		handleProductAdd(req, res, db);
	});

	app.delete("/products/:productID", (req: any, res: any) => {
		handleProductDelete(req, res, db);
	});

	app.patch("/products/:productID", (req: any, res: any) => {
		handleProductEdit(req, res, db);
	});

	app.get("/reviews", (req: any, res: any) => {
		handleGetTotalReviews(req, res, db);
	});

	app.get("/reviews/:id", (req: any, res: any) => {
		handleGetReview(req, res, db);
	});

	app.post("/reviews/:productID", (req: any, res: any) => {
		handleReviewAdd(req, res, db);
	});

	app.delete("/reviews/:reviewID", (req: any, res: any) => {
		handleReviewDelete(req, res, db);
	});

	app.patch("/reviews/:reviewID", (req: any, res: any) => {
		handleReviewEdit(req, res, db);
	});

	app.get("/", (req, res) => {
		res.send("Hello world!");
	});

	if (!test) {
		app.listen(port, () => {
			console.log(`server started at http://localhost:${port}`);
		});
	}

	return app;
}

createMux(false);
