import mysql from "mysql";
import url from "url";
import { getUser, isOwner, getReviewByID } from "./helpers";

function handleGetSpecificReview(req: any, res: any, db: mysql.Connection) {
	const reviewID: number = Number(req.params.reviewID);
	const queryObject = url.parse(req.url, true).query;
	const limit = queryObject.limit;
	db.query(
		`SELECT * FROM reviews WHERE id = ?${limit ? ` limit ${limit}` : null}`,
		reviewID,
		function (err, response) {
			if (err) {
				res.status(400);
				res.send("Error retrieving review");
				return;
			}
			res.status(200);
			res.json(response[0]);
			return;
		}
	);
}

function handleGetProductReviews(req: any, res: any, db: mysql.Connection) {
	const productID: number = Number(req.params.productID);
	const queryObject = url.parse(req.url, true).query;
	const limit = queryObject.limit;
	db.query(
		`SELECT * FROM reviews WHERE product_id = ?${limit ? ` limit ${limit}` : null}`,
		productID,
		function (err, response) {
			if (err) {
				res.status(400);
				res.send("Error retrieving product reviews");
				return;
			}
			res.status(200);
			res.json(response);
			return;
		}
	);
}

function handleGetTotalReviews(req: any, res: any, db: mysql.Connection) {
	const queryObject = url.parse(req.url, true).query;
	const limit = queryObject.limit;
	db.query(`SELECT * FROM reviews${limit ? ` limit ${limit}` : null}`, function (err, response) {
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

function handleGetCompanyReviews(req: any, res: any, db: mysql.Connection) {
	const companyID: number = Number(req.params.companyID);
	const queryObject = url.parse(req.url, true).query;
	const limit = queryObject.limit;
	db.query(
		`SELECT * FROM reviews t1 inner join products t2 on t1.product_id = t2.id WHERE t2.company_id = ?${
			limit ? ` limit ${limit}` : null
		}`,
		companyID,
		function (err, response) {
			if (err) {
				res.status(400);
				res.send("Error retrieving company product reviews");
				return;
			}
			res.status(200);
			res.json(response);
			return;
		}
	);
}

function handleReviewAdd(req: any, res: any, db: mysql.Connection) {
	const productID = req.params.productID;
	const newReview = req.body;
	const user = getUser(req);
	db.query(
		"INSERT INTO reviews (product_id, rating, message, created_user_id, time_created) VALUES (?, ?, ?, ?, current_timestamp)",
		[productID, newReview.rating, newReview.message, user.id],
		function (err, response) {
			if (err) {
				res.status(400);
				res.send("Error creating new review");
				return;
			}
			getReviewByID(response.insertId, db, function (err: mysql.MysqlError, response: any) {
				res.status(201);
				if (err) {
					res.send("Review created but error retrieving row");
					return;
				}
				res.json(response[0]);
				return;
			});
		}
	);
}

function handleReviewDelete(req: any, res: any, db: mysql.Connection) {
	const reviewID: number = Number(req.params.reviewID);
	const user = getUser(req);

	getReviewByID(reviewID, db, function (err: mysql.MysqlError, response: any) {
		if (err) {
			res.status(400);
			return;
		}
		if (!isOwner(user, response[0].created_user_id)) {
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

function handleReviewEdit(req: any, res: any, db: mysql.Connection) {
	const reviewID: number = Number(req.params.reviewID);
	const reviewEdits = req.body;
	const user = getUser(req);

	let edits = [];
	if (reviewEdits.rating) edits.push(`rating = ${reviewEdits.rating}`);
	if (reviewEdits.message) edits.push(`message = ${reviewEdits.message}`);
	const editQuery = edits.join(",");
	if (editQuery.length < 1) {
		res.status(200);
		res.send("Nothing to edit");
		return;
	}

	getReviewByID(reviewID, db, function (err: mysql.MysqlError, response: any) {
		if (err) {
			res.status(400);
			return;
		}
		if (!isOwner(user, response[0].created_user_id)) {
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
			getReviewByID(reviewID, db, function (err: mysql.MysqlError, response: any) {
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

export {
	handleGetProductReviews,
	handleGetSpecificReview,
	handleGetTotalReviews,
	handleGetCompanyReviews,
	handleReviewAdd,
	handleReviewDelete,
	handleReviewEdit,
};
