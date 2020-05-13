"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
// TODO: When i get these products I need to query reviews to get average
function handleGetSpecificProduct(req, res, db) {
    const productID = Number(req.params.productID);
    helpers_1.getProductByID(productID, db, function (err, response) {
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
exports.handleGetSpecificProduct = handleGetSpecificProduct;
function handleGetTotalProducts(_, res, db) {
    db.query("SELECT * from products", function (err, response) {
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
exports.handleGetTotalProducts = handleGetTotalProducts;
function handleGetCompanyProducts(req, res, db) {
    const companyID = Number(req.params.companyID);
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
exports.handleGetCompanyProducts = handleGetCompanyProducts;
function handleProductAdd(req, res, db) {
    const newProduct = req.body;
    const name = newProduct.name;
    const price = newProduct.price;
    const companyID = newProduct.companyID;
    const user = helpers_1.getUser(req);
    db.query("SELECT * FROM companies WHERE companyID = ?", companyID, function (err, response) {
        if (err) {
            res.status(400);
            return;
        }
        const creatorID = response[0].creator_id;
        if (!helpers_1.isOwner(user, creatorID)) {
            res.status(401);
            res.send("User is not authenticated");
            return;
        }
        db.query("INSERT INTO products (product_name, company_id, price, created) VALUES (?, ?, ?, current_timestamp)", [name, companyID, price], function (err, response) {
            if (err) {
                res.status(400);
                res.send("Error creating new product");
                return;
            }
            res.status(201);
            const newID = response.insertId;
            helpers_1.getProductByID(newID, db, function (err, response) {
                if (err) {
                    res.send("Inserted but cannot get the returned result");
                    return;
                }
                res.json(response[0]);
                return;
            });
        });
    });
}
exports.handleProductAdd = handleProductAdd;
function handleProductDelete(req, res, db) {
    const user = helpers_1.getUser(req);
    const productID = Number(req.params.productID);
    helpers_1.verifyUserCanModifyProduct(user.id, productID, db, function (success) {
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
exports.handleProductDelete = handleProductDelete;
function handleProductEdit(req, res, db) {
    const user = helpers_1.getUser(req);
    const productID = Number(req.params.productID);
    const edits = req.body;
    let updates = [];
    if (edits.name)
        updates.push(`product_name = ${edits.name}`);
    if (edits.price)
        updates.push(`price = ${edits.price}`);
    if (updates.length === 0) {
        res.status(200);
        res.send("No updates were made.");
        return;
    }
    const setStatement = updates.join(",");
    const query = "UPDATE products SET " + setStatement + " WHERE productID = ?";
    helpers_1.verifyUserCanModifyProduct(user.id, productID, db, function (success) {
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
            helpers_1.getProductByID(productID, db, function (err, response) {
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
exports.handleProductEdit = handleProductEdit;
//# sourceMappingURL=productHandlers.js.map