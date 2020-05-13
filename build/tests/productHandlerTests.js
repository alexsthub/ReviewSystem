"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe("Get product", function () {
    it("expect json", function (done) {
        supertest_1.default(index_1.default).get("/products/1").expect("Content-Type", /json/).expect(200, {
            id: 1,
            product_name: "phone",
            company_id: 1,
            price: 100,
            created: Date(),
        });
    });
});
//# sourceMappingURL=productHandlerTests.js.map