"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
const index_1 = __importDefault(require("../index"));
const app = index_1.default(true);
describe("Testing for review handlers", function () {
    describe("GET /", function () {
        it("should return a single review by reviewID", (done) => {
            chai_1.default
                .request(app)
                .get("/reviews/1?type=review")
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Object");
                res.body.message.should.equal("Sensational product");
                done();
            });
        });
        it("should return 2 reviews by productID", (done) => {
            chai_1.default
                .request(app)
                .get("/reviews/1/?type=product")
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Array");
                res.body.should.have.lengthOf(2);
                done();
            });
        });
        it("should return empty on nonexistent productID", (done) => {
            chai_1.default
                .request(app)
                .get("/reviews/0")
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.lengthOf(0);
                done();
            });
        });
    });
    describe("POST /", function () {
        it("Should write a new review", (done) => {
            const payload = {
                rating: 4,
                message: "Testing",
            };
            chai_1.default
                .request(app)
                .post("/reviews/2")
                .set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
                .send(payload)
                .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("Object");
                res.body.should.have.a.property("rating");
                res.body.message.should.equal("Testing");
                done();
            });
        });
        it("Should fail if writing a review to a nonexistent product", (done) => {
            const payload = {
                rating: 4,
                message: "Testing",
            };
            chai_1.default
                .request(app)
                .post("/reviews/0")
                .set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
                .send(payload)
                .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });
    describe("PATCH /", function () {
        it("Should edit rating", (done) => {
            const payload = {
                rating: 1,
            };
            chai_1.default
                .request(app)
                .patch("/reviews/3")
                .set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
                .send(payload)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Object");
                res.body.should.have.a.property("rating");
                res.body.rating.should.equal(1);
                done();
            });
        });
        it("Should edit message", (done) => {
            const payload = {
                message: "new message",
            };
            chai_1.default
                .request(app)
                .patch("/reviews/3")
                .set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
                .send(payload)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Object");
                res.body.should.have.a.property("message");
                res.body.message.should.equal("new message");
                done();
            });
        });
        it("Should edit both", (done) => {
            const payload = {
                rating: 5,
                message: "edit both",
            };
            chai_1.default
                .request(app)
                .patch("/reviews/3")
                .set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
                .send(payload)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Object");
                res.body.should.have.a.property("message");
                res.body.should.have.a.property("rating");
                res.body.rating.should.equal(5);
                res.body.message.should.equal("edit both");
                done();
            });
        });
    });
    describe("DELETE /", function () {
        it("Should delete a post", (done) => {
            chai_1.default
                .request(app)
                .delete("/reviews/3")
                .set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
                .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});
//# sourceMappingURL=reviewHandlerTests.js.map