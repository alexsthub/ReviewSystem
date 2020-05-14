"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const helpers_1 = require("./helpers");
function handleGetReview(req, res, db) {
    const id = Number(req.params.id);
    const queryObject = url_1.default.parse(req.url, true).query;
    const limit = queryObject.limit;
    const type = queryObject.type ? queryObject.type : "product";
    let query = `SELECT * FROM reviews WHERE ${type === "product" ? "product_id" : "id"} = ? ORDER BY created_time desc`;
    if (limit)
        query = query + ` limit ${limit}`;
    db.query(query, id, function (err, response) {
        if (err) {
            res.status(400);
            res.send("Error retrieving review");
            return;
        }
        res.status(200);
        if (type === "product")
            res.json(response);
        else
            res.json(response[0]);
        return;
    });
}
exports.handleGetReview = handleGetReview;
function handleGetTotalReviews(req, res, db) {
    const queryObject = url_1.default.parse(req.url, true).query;
    const limit = queryObject.limit;
    let query = "SELECT * FROM reviews ORDER BY created_time desc";
    if (limit)
        query = query + ` limit ${limit}`;
    db.query(query, function (err, response) {
        if (err) {
            res.status(400);
            res.send("Error retrieving product reviews");
            return;
        }
        res.status(200);
        res.json(response);
        return;
    });
}
exports.handleGetTotalReviews = handleGetTotalReviews;
function handleGetCompanyReviews(req, res, db) {
    const companyID = Number(req.params.companyID);
    const queryObject = url_1.default.parse(req.url, true).query;
    const limit = queryObject.limit;
    let query = "SELECT * FROM reviews t1 inner join products t2 on t1.product_id = t2.id WHERE t2.company_id = ? ORDER BY t1.created_time DESC";
    if (limit)
        query = query + ` limit ${limit}`;
    db.query(query, companyID, function (err, response) {
        if (err) {
            res.status(400);
            res.send("Error retrieving company product reviews");
            return;
        }
        res.status(200);
        res.json(response);
        return;
    });
}
function handleReviewAdd(req, res, db) {
    const productID = req.params.productID;
    const newReview = req.body;
    const user = helpers_1.getUser(req);
    helpers_1.getProductByID(productID, db, function (err, response) {
        if (err) {
            res.status(400);
            res.send("Cannot verify product");
            return;
        }
        if (response.length < 1) {
            res.status(400);
            res.send("Cannot write a review for a product that does not exist");
            return;
        }
        db.query("INSERT INTO reviews (product_id, rating, message, created_user_id, created_time) VALUES (?, ?, ?, ?, current_timestamp)", [productID, newReview.rating, newReview.message, user.id], function (err, response) {
            if (err) {
                res.status(400);
                res.send("Error creating new review");
                return;
            }
            helpers_1.getReviewByID(response.insertId, db, function (err, response) {
                res.status(201);
                if (err) {
                    res.send("Review created but error retrieving row");
                    return;
                }
                res.json(response[0]);
                return;
            });
        });
    });
}
exports.handleReviewAdd = handleReviewAdd;
function handleReviewDelete(req, res, db) {
    const reviewID = Number(req.params.reviewID);
    const user = helpers_1.getUser(req);
    helpers_1.getReviewByID(reviewID, db, function (err, response) {
        if (err || response.length === 0) {
            res.status(400);
            res.send("Cannot verify review");
            return;
        }
        if (!helpers_1.isOwner(user, response[0].created_user_id)) {
            res.status(401);
            res.send("User is not authorized");
            return;
        }
        db.query("DELETE FROM reviews WHERE id = ?", reviewID, function (err, response) {
            if (err) {
                res.status(400);
                res.send("Error deleting review");
                return;
            }
            res.status(200);
            res.send("Review deleted");
            return;
        });
    });
}
exports.handleReviewDelete = handleReviewDelete;
function handleReviewEdit(req, res, db) {
    const reviewID = Number(req.params.reviewID);
    const reviewEdits = req.body;
    const user = helpers_1.getUser(req);
    let edits = [];
    if (reviewEdits.rating)
        edits.push(`rating = ${reviewEdits.rating}`);
    if (reviewEdits.message)
        edits.push(`message = "${reviewEdits.message}"`);
    const editQuery = edits.join(",");
    if (editQuery.length < 1) {
        res.status(200);
        res.send("Nothing to edit");
        return;
    }
    helpers_1.getReviewByID(reviewID, db, function (err, response) {
        if (err) {
            res.status(400);
            return;
        }
        if (!helpers_1.isOwner(user, response[0].created_user_id)) {
            res.status(401);
            res.send("User is not authorized");
            return;
        }
        const query = "UPDATE reviews SET " + editQuery + " WHERE id = ?";
        db.query(query, reviewID, function (err, _) {
            if (err) {
                res.status(400);
                res.send("Error updating review");
                return;
            }
            helpers_1.getReviewByID(reviewID, db, function (err, response) {
                res.status(200);
                if (err) {
                    res.send("Updated by error retrieving updated row");
                    return;
                }
                res.json(response[0]);
                return;
            });
        });
    });
}
exports.handleReviewEdit = handleReviewEdit;
//# sourceMappingURL=reviewHandlers.js.map