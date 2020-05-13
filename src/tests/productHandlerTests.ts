import request from "supertest";
import express from "express";
import app from "../index";

describe("Get product", function () {
	it("expect json", function (done) {
		request(app).get("/products/1").expect("Content-Type", /json/).expect(200, {
			id: 1,
			product_name: "phone",
			company_id: 1,
			price: 100,
			created: Date(),
		});
	});
});
