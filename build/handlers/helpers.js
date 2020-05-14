"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUser(req) {
    let user = req.header("X-user");
    // user = JSON.parse(user);
    return JSON.parse(user);
}
exports.getUser = getUser;
function isOwner(user, compareID) {
    return user && compareID && user.id === compareID;
}
exports.isOwner = isOwner;
function getProductByID(id, db, callback) {
    db.query("SELECT * from products WHERE id = ?", id, function (err, response) {
        callback(err, response);
    });
}
exports.getProductByID = getProductByID;
function getCompanyByID(id, db, callback) {
    db.query("SELECT * from companies WHERE id = ?", id, function (err, response) {
        callback(err, response);
    });
}
exports.getCompanyByID = getCompanyByID;
function getReviewByID(id, db, callback) {
    db.query("SELECT * from reviews WHERE id = ?", id, function (err, response) {
        callback(err, response);
    });
}
exports.getReviewByID = getReviewByID;
function verifyUserCanModifyProduct(userID, productID, db, callback) {
    db.query("SELECT * FROM products t1 JOIN companies t2 on t1.company_id = t2.id and t1.id = ?", productID, function (err, response) {
        if (err || userID !== response[0].creator_id) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
}
exports.verifyUserCanModifyProduct = verifyUserCanModifyProduct;
//# sourceMappingURL=helpers.js.map