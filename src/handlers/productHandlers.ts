import mysql from "mysql";
import { getUser, isOwner, getProductByID, verifyUserCanModifyProduct } from "./helpers";

// TODO: When i get these products I need to query reviews to get average
function handleGetSpecificProduct(req: any, res: any, db: mysql.Connection) {
	const productID: number = Number(req.params.productID);
	getProductByID(productID, db, function (err: any, response: any) {
		if (err) {
			res.status(400);
			res.send("Error retrieving product");
			return;
		}
		res.status(200);
		res.json(response[0]);
		return;
	});
}

function handleGetTotalProducts(_: any, res: any, db: mysql.Connection) {
	db.query("SELECT * from products", function (err, response: object[]) {
		if (err) {
			res.status(400);
			res.send("Error retrieving companies");
			return;
		}
		res.status(200);
		res.json(response);
		return;
	});
}

function handleGetCompanyProducts(req: any, res: any, db: mysql.Connection) {
	const companyID: number = Number(req.params.companyID);
	db.query("SELECT * from products WHERE company_id = ?", companyID, function (err, response) {
		if (err) {
			res.status(400);
			res.send("Cannot get company products");
			return;
		}
		res.status(200);
		res.json(response);
		return;
	});
}

function handleProductAdd(req: any, res: any, db: mysql.Connection) {
	const newProduct: any = req.body;
	const name: string = newProduct.name;
	const price: number = newProduct.price;
	const companyID: number = newProduct.companyID;

	const user = getUser(req);
	db.query("SELECT * FROM companies WHERE companyID = ?", companyID, function (err, response) {
		if (err) {
			res.status(400);
			return;
		}
		const creatorID = response[0].creator_id;
		if (!isOwner(user, creatorID)) {
			res.status(401);
			res.send("User is not authenticated");
			return;
		}
		db.query(
			"INSERT INTO products (product_name, company_id, price, created) VALUES (?, ?, ?, current_timestamp)",
			[name, companyID, price],
			function (err, response) {
				if (err) {
					res.status(400);
					res.send("Error creating new product");
					return;
				}
				res.status(201);
				const newID = response.insertId;
				getProductByID(newID, db, function (err: any, response: any) {
					if (err) {
						res.send("Inserted but cannot get the returned result");
						return;
					}
					res.json(response[0]);
					return;
				});
			}
		);
	});
}

function handleProductDelete(req: any, res: any, db: mysql.Connection) {
	const user = getUser(req);
	const productID: number = Number(req.params.productID);

	verifyUserCanModifyProduct(user.id, productID, db, function (success: boolean) {
		if (!success) {
			res.status(401);
			res.send("User does not have permission to delete product");
			return;
		}
		db.query("DELETE FROM products WHERE id = ?", productID, function (err, response) {
			if (err) {
				res.status(400);
				res.send("Error deleting product");
				return;
			}
			res.status(200);
			res.send("Product deleted");
			return;
		});
	});
}

function handleProductEdit(req: any, res: any, db: mysql.Connection) {
	const user: any = getUser(req);
	const productID: number = Number(req.params.productID);

	const edits: any = req.body;
	let updates: string[] = [];
	if (edits.name) updates.push(`product_name = ${edits.name}`);
	if (edits.price) updates.push(`price = ${edits.price}`);
	if (updates.length === 0) {
		res.status(200);
		res.send("No updates were made.");
		return;
	}

	const setStatement = updates.join(",");
	const query = "UPDATE products SET " + setStatement + " WHERE productID = ?";
	verifyUserCanModifyProduct(user.id, productID, db, function (success: boolean) {
		if (!success) {
			res.status(401);
			res.send("User does not have permission to delete product");
			return;
		}
		db.query(query, productID, function (err, response) {
			if (err) {
				res.status(400);
				res.send("Error updating product");
				return;
			}
			getProductByID(productID, db, function (err: any, response: any) {
				res.status(200);
				if (err) {
					res.send("Updated product successfully but failed to retrieve the updated data");
					return;
				}
				res.json(response[0]);
				return;
			});
		});
	});
}

export {
	handleGetSpecificProduct,
	handleGetTotalProducts,
	handleGetCompanyProducts,
	handleProductAdd,
	handleProductDelete,
	handleProductEdit,
};
