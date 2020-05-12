import mysql from "mysql";

function getUser(req: any) {
	let user = req.header("X-user");
	user = JSON.parse(user);
	return user;
}

function isOwner(user: any, compareID: number) {
	return user && compareID && user.id === compareID;
}

function getProductByID(id: number, db: mysql.Connection, callback: Function) {
	db.query("SELECT * from products WHERE id = ?", id, function (err: any, response: any) {
		callback(err, response);
	});
}

function getCompanyByID(id: number, db: mysql.Connection, callback: Function) {
	db.query("SELECT * from companies WHERE id = ?", id, function (err: any, response: any) {
		callback(err, response);
	});
}

function verifyUserCanModifyProduct(
	userID: number,
	productID: number,
	db: mysql.Connection,
	callback: Function
) {
	db.query(
		"SELECT * FROM products t1 JOIN companies t2 on t1.company_id = t2.id and t1.id = ?",
		productID,
		function (err, response) {
			if (err || userID !== response[0].creator_id) {
				callback(false);
			} else {
				callback(true);
			}
		}
	);
}

export { getUser, isOwner, getProductByID, getCompanyByID, verifyUserCanModifyProduct };
