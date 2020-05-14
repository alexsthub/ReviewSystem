"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./db/database"));
const reviewHandlers_1 = require("./handlers/reviewHandlers");
const companyHandlers_1 = require("./handlers/companyHandlers");
const productHandlers_1 = require("./handlers/productHandlers");
const app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default("dev"));
const port = Number(process.env.PORT) || 8080;
// TODO: Tests
app.get("/company", (req, res) => {
    companyHandlers_1.handleGetTotalCompanies(req, res, database_1.default);
});
app.post("/company", (req, res) => {
    companyHandlers_1.handleCompanyAdd(req, res, database_1.default);
});
app.delete("/company/:companyID", (req, res) => {
    companyHandlers_1.handleCompanyDelete(req, res, database_1.default);
});
app.patch("/company/:companyID", (req, res) => {
    companyHandlers_1.handleCompanyEdit(req, res, database_1.default);
});
app.get("/products/:productID", (req, res) => {
    productHandlers_1.handleGetSpecificProduct(req, res, database_1.default);
});
app.get("/products", (req, res) => {
    productHandlers_1.handleGetTotalProducts(req, res, database_1.default);
});
app.get("/products/:companyID", (req, res) => {
    productHandlers_1.handleGetCompanyProducts(req, res, database_1.default);
});
app.post("/products", (req, res) => {
    productHandlers_1.handleProductAdd(req, res, database_1.default);
});
app.delete("/products/:productID", (req, res) => {
    productHandlers_1.handleProductDelete(req, res, database_1.default);
});
app.patch("/products/:productID", (req, res) => {
    productHandlers_1.handleProductEdit(req, res, database_1.default);
});
app.get("/reviews/:id", (req, res) => {
    reviewHandlers_1.handleGetReview(req, res, database_1.default);
});
app.post("/reviews/:productID", (req, res) => {
    reviewHandlers_1.handleReviewAdd(req, res, database_1.default);
});
app.delete("/reviews/:reviewID", (req, res) => {
    reviewHandlers_1.handleReviewDelete(req, res, database_1.default);
});
app.patch("/reviews/:reviewID", (req, res) => {
    reviewHandlers_1.handleReviewEdit(req, res, database_1.default);
});
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map