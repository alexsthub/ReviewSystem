"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./db/database"));
const reviewHandlers_1 = require("./handlers/reviewHandlers");
const companyHandlers_1 = require("./handlers/companyHandlers");
const productHandlers_1 = require("./handlers/productHandlers");
function createMux(test) {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(morgan_1.default("dev"));
    app.use(cors_1.default());
    let port = Number(process.env.PORT) || 8080;
    if (test)
        port = 8081;
    const db = database_1.default(test);
    app.get("/company", (req, res) => {
        companyHandlers_1.handleGetTotalCompanies(req, res, db);
    });
    app.post("/company", (req, res) => {
        companyHandlers_1.handleCompanyAdd(req, res, db);
    });
    app.delete("/company/:companyID", (req, res) => {
        companyHandlers_1.handleCompanyDelete(req, res, db);
    });
    app.patch("/company/:companyID", (req, res) => {
        companyHandlers_1.handleCompanyEdit(req, res, db);
    });
    app.get("/products", (req, res) => {
        productHandlers_1.handleGetTotalProducts(req, res, db);
    });
    app.get("/products/:productID", (req, res) => {
        productHandlers_1.handleGetSpecificProduct(req, res, db);
    });
    app.get("/products/company/:companyID", (req, res) => {
        productHandlers_1.handleGetCompanyProducts(req, res, db);
    });
    app.post("/products", (req, res) => {
        productHandlers_1.handleProductAdd(req, res, db);
    });
    app.delete("/products/:productID", (req, res) => {
        productHandlers_1.handleProductDelete(req, res, db);
    });
    app.patch("/products/:productID", (req, res) => {
        productHandlers_1.handleProductEdit(req, res, db);
    });
    app.get("/reviews", (req, res) => {
        reviewHandlers_1.handleGetTotalReviews(req, res, db);
    });
    app.get("/reviews/:id", (req, res) => {
        reviewHandlers_1.handleGetReview(req, res, db);
    });
    app.post("/reviews/:productID", (req, res) => {
        reviewHandlers_1.handleReviewAdd(req, res, db);
    });
    app.delete("/reviews/:reviewID", (req, res) => {
        reviewHandlers_1.handleReviewDelete(req, res, db);
    });
    app.patch("/reviews/:reviewID", (req, res) => {
        reviewHandlers_1.handleReviewEdit(req, res, db);
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
exports.default = createMux;
createMux(false);
//# sourceMappingURL=index.js.map