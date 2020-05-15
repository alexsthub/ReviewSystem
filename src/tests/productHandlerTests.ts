import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);
chai.should();

import createMux from "../index";

const app = createMux(true);
describe("Testing for product handlers", function () {
	describe("GET /product total", function () {
		it("Should return all two products", (done) => {
			chai
				.request(app)
				.get("/products")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.lengthOf(2);
					res.body.should.be.a("Array");
					done();
				});
		});
		it("Should return one with limit 1", (done) => {
			chai
				.request(app)
				.get("/products?limit=1")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("Array");
					res.body.should.have.lengthOf(1);
					res.body[0].product_name.should.equal("Test Product");
					done();
				});
		});
	});

	describe("GET /product:productID", function () {
		it("Should return a single product", (done) => {
			chai
				.request(app)
				.get("/products/1")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("Object");
					res.body.product_name.should.equal("Test Product");
					done();
				});
		});

		it("Should be empty if product does not exist", (done) => {
			chai
				.request(app)
				.get("/products/0")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.empty;
					done();
				});
		});
	});

	describe("POST /product", function () {
		it("Should create a new product", (done) => {
			const payload = {
				companyID: 1,
				name: "Big Ounce",
				price: 1.69,
			};
			chai
				.request(app)
				.post("/products")
				.set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
				.send(payload)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a("Object");
					res.body.should.have.a.property("company_id");
					res.body.should.have.a.property("product_name");
					res.body.should.have.a.property("price");
					res.body.product_name.should.equal("Big Ounce");
					done();
				});
		});
		it("Should fail because of authentication", (done) => {
			const payload = {
				companyID: 1,
				name: "My product",
				price: 5.0,
			};
			chai
				.request(app)
				.post("/products")
				.set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krA6"}')
				.send(payload)
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});

	describe("PATCH /product", function () {
		it("should change name and price", (done) => {
			const payload = {
				name: "New Name",
				price: 10.0,
			};
			chai
				.request(app)
				.patch("/products/3")
				.send(payload)
				.set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.product_name.should.equal("New Name");
					res.body.price.should.equal(10.0);
					done();
				});
		});
	});

	describe("DELETE /product", function () {
		it("Should delete a product", (done) => {
			chai
				.request(app)
				.delete("/products/3")
				.set("X-user", '{"id": "M3fdQvztKvdagO84WEvNJPf5krB3"}')
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});
